const { verifyToken } = require("../helpers/jwt");

async function userAuthentication(ctx, next) {
  if (ctx.request.headers.token) {
    let result = verifyToken(ctx.request.headers.token);

    ctx.decoded = result;
    return next();
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "Authentication Error, please login first!!",
    };
  }
}

module.exports = userAuthentication;
