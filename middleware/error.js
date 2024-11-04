const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({ msg: err.message });
};

export default errorHandler;
