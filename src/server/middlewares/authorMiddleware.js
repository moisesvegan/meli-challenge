const authorMiddleware = (req, res, next) => {
  res.author = {
    name: 'Moises',
    lastname: 'Vega'
  };
  next();
};

module.exports = authorMiddleware;
