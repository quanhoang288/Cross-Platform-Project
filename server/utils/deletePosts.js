const PostModel = require("../models/Posts");
const PostReportModel = require("../models/PostReport");
const { NUM_REPORTS_LIMIT, STATUS_DELETED } = require("../constants/constants");

module.exports = async () => {
  try {
    const postsToDelete = await PostReportModel.aggregate([
      { $group: { _id: "$post", reportCount: { $sum: 1 } } },
      {
        $match: {
          reportCount: { $gt: NUM_REPORTS_LIMIT },
        },
      },
    ]);
    const postIds = postsToDelete.map((post) => post._id);
    await PostModel.updateMany(
      { _id: postIds, status: { $ne: STATUS_DELETED } },
      { status: STATUS_DELETED }
    );
    console.log("Deleted all reported posts");
  } catch (error) {
    console.error(error);
  }
};
