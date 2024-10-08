const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler,
};

