exports.successResponse = (res, options = {}) => {
  const {
    statusCode = 200,
    message = "Success",
    data = null,
    pagination = null,
    ...extra
  } = options;

  const response = { success: true, statusCode, message, ...extra };

  if (data !== null && data !== undefined) response.data = data;
  if (pagination) response.pagination = pagination;

  return res.status(statusCode).json(response);
};

exports.errorResponse = (res, statusCode, message, errors = null) => {
  const response = { success: false, statusCode, message };

  if (errors) {
    const errorArray = Array.isArray(errors) ? errors : [errors];

    response.errors = errorArray.map((err) => {
      if (typeof err === "string") return { message: err };
      return err;
    });
  }

  return res.status(statusCode).json(response);
};
