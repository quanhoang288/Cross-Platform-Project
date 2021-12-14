const { DEFAULT_PAGE_SIZE } = require('../constants/constants');

const getPaginationParams = async (req, model, query) => {
  const limit = req.query.limit || DEFAULT_PAGE_SIZE;
  const pageToQuery = req.query.page || 1;
  const offset = (pageToQuery - 1) * limit;
  const totalCount = await model.countDocuments(query);
  const numOfPages = Math.ceil(totalCount / limit);
  return {
    curPage: pageToQuery,
    limit,
    offset,
    numOfPages,
  };
};

module.exports = getPaginationParams;
