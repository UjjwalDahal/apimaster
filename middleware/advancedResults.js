const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // copy req query
  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create our own query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // query with our created string
  query = model.find(JSON.parse(queryStr))

  // filtering query
  if (req.query.select) {
    let fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sorting query

  if (req.query.sort) {
    let fields = req.query.sort.split(",").join(" ");
    query = query.sort(fields);
  }

  // pagination

  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit) || 1;
  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;
  let total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);


  if(populate){
      query = query.populate(populate)
  }

  // executing query
  const results = await query;

  let pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
