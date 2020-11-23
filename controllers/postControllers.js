const { post } = require("../models");
const Log = require("../models/mongodb/log");
const Notification = require("../models/mongodb/notification");

class PostController {
  static async selectPost(ctx) {
    const result = await post.findByPk(ctx.params.id);

    ctx.status = 200;
    ctx.body = result;
  }

  static async myPosts(ctx) {
    console.log(ctx.decoded);
    const result = await post.findAll({ where: { userId: ctx.decoded.id } });
    ctx.status = 200;
    ctx.body = result;
  }

  static async create(ctx) {
    const { postdata } = ctx.request.body;
    await post
      .create({
        post: postdata,
        userId: ctx.decoded.id,
      })
      .then((result) => {
        ctx.status = 201;
        ctx.body = result;
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err.message;
      });
  }

  static async edit(ctx) {
    const { postdata } = ctx.request.body;

    const result = await post
      .update({ post: postdata }, { where: { id: ctx.params.id } })
      .then((result) => {
        ctx.status = 200;
        ctx.body = { message: "update completed!!" };
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err.message;
      });
  }

  static async delete(ctx) {
    const result = await post.destroy({
      where: { id: ctx.params.id },
      returning: true,
    });

    ctx.status = 200;
    ctx.body = {
      message: "delete completed",
    };
  }
}

module.exports = PostController;
