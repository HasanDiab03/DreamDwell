export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHanlder = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  // Check for mongoose Cast Error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Invalid ObjectId";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🅿️" : err.stack,
    success: false,
  });
};
