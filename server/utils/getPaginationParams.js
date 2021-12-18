const { DEFAULT_PAGE_SIZE } = require("../constants/constants");

const getPaginationParams = async (req) => {
  let limit = DEFAULT_PAGE_SIZE,
    offset = 0;
  if (req.query.page) {
    limit = DEFAULT_PAGE_SIZE;
    offset = (req.query.page - 1) * limit;
  } else if (req.query.offset && req.query.limit) {
    limit = Number(req.query.limit);
    offset = Number(req.query.offset);
  }
  return {
    limit,
    offset,
  };
};

module.exports = getPaginationParams;
