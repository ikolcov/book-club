const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.status = 401;
    return false;
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = ctx.headers.authorization.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    // eslint-disable-next-line no-underscore-dangle
    if (user._id.toString() === decoded.sub) {
      ctx.state.user = user;
      return next();
    }
  } catch (e) {
    ctx.status = 401;
    return false;
  }
  return false;
};
