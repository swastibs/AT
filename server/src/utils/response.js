const successResponse = (
  res,
  message,
  data = null,
  statusCode = 200,
  pagination = null,
) => {
  const response = {
    success: true,
    message,
    data,
    errors: null,
    timestamp: new Date().toISOString(),
    pagination,
  };
  return res.status(statusCode).json(response);
};

const createdResponse = (res, message, data) => {
  return successResponse(res, message, data, 201);
};

const paginatedResponse = (
  res,
  message,
  data,
  page,
  limit,
  total,
  statusCode = 200,
) => {
  const pages = Math.ceil(total / limit);
  const pagination = { page, limit, total, pages };
  return successResponse(res, message, data, statusCode, pagination);
};

module.exports = { successResponse, createdResponse, paginatedResponse };
