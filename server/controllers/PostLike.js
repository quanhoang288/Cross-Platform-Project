const httpStatus = require("../utils/httpStatus");
const PostModel = require("../models/Posts");
const { STATUS_DELETED } = require("../constants/constants");

const postLikeController = {};

postLikeController.action = async (req, res, next) => {
  try {
    let userId = req.userId;
    let post = await PostModel.findById(req.params.postId);
    if (post == null) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Can not find post" });
    }

    if (post.status == STATUS_DELETED) {
      return res
        .status(httpStatus.GONE)
        .json({ message: "This post has been deleted" });
    }

    let arrLike = post.like;
    let isLike;
    let arrLikeNotContainCurrentUser = arrLike.filter((item) => {
      return item != userId;
    });
    if (arrLikeNotContainCurrentUser.length === arrLike.length) {
      arrLike.push(userId);
      isLike = true;
    } else {
      arrLike = arrLikeNotContainCurrentUser;
      isLike = false;
    }
    post = await PostModel.findOneAndUpdate(
      { _id: req.params.postId },
      {
        like: arrLike,
        isLike: isLike,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("like", ["username", "phonenumber"]);

    if (!post) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Can not find post" });
    }
    return res.status(httpStatus.OK).json({
      data: post,
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = postLikeController;
