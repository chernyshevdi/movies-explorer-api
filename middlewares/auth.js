const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(req.cookies.token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
