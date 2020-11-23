const { user } = require("../models");
const Log = require("../models/mongodb/log");
const Notification = require("../models/mongodb/notification");
const { generateToken } = require("../helpers/jwt");

const mailgun = require("mailgun-js");
const DOMAIN = "sandboxdb2c259c828c42d98b34010566747014.mailgun.org";
const mg = mailgun({
  apiKey: "b4f235469366a76bcb07d09ac7cd6b9e-2af183ba-ebb926b7",
  domain: DOMAIN,
});

class UserController {
  static async login(ctx) {
    let response = {};
    console.log(ctx.request.body);
    const result = await user.findOne({
      where: { email: ctx.request.body.email },
    });
    console.log(result);
    if (result == null) {
      ctx.status = 400;
      response = { message: "email is not valid" };
    } else {
      if (result.password == ctx.request.body.password) {
        let payload = { id: result.id };
        let token = generateToken(payload);
        ctx.status = 200;
        response = { token };
      } else {
        ctx.status = 400;
        response = { message: "password is not valid" };
      }
    }

    ctx.body = response;
  }

  static async register(ctx, next) {
    const { name, email, password } = ctx.request.body;

    await user
      .create({ name, email, password })
      .then(async (result) => {
        const senddata = {
          from:
            "Mailgun Sandbox <postmaster@sandboxdb2c259c828c42d98b34010566747014.mailgun.org>",
          to: email,
          subject: `Hello ${name}`,
          text: `Thank You For Register, ${name}`,
        };
        mg.messages().send(senddata, function (error, body) {
          console.log(body);
        });
        console.log("masuk");
        ctx.status = 201;
        ctx.body = {
          message:
            "register completed, please check your email for verification",
        };
      })
      .catch(async (err) => {
        ctx.status = 400;
        ctx.body = err.message;
        //   ctx.response = err
        //  return next(err)
      });
  }

  static testMiddleware(ctx) {
    const data = {
      from:
        "Mailgun Sandbox <postmaster@sandboxdb2c259c828c42d98b34010566747014.mailgun.org>",
      to: "delanameginia@gmail.com",
      subject: "Hello",
      text: "Testing some Mailgun awesomness!",
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
    ctx.status = 200;
    ctx.body = {
      message: "completed",
    };
  }

  static verify(ctx) {
    const result = user.findByPk(ctx.decoded.id);
    result.verified = true;
    result.save();

    ctx.status = 200;
    ctx.body = {
      message: "Verify Completed!!",
    };
  }
}

module.exports = UserController;
