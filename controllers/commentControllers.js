const { comment } = require("../models");
const Log = require("../models/mongodb/log");
const Notification = require("../models/mongodb/notification");

class CommentController {
  static async create(ctx) {
    const { postId, commentdata } = ctx.request.body;
    await comment
      .create({
        userId: ctx.decoded.id,
        postId,
        comment: commentdata,
      })
      .then((result) => {
        ctx.status = 201;
        ctx.body = {
          message: "creating comment completed",
        };
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
      });
  }

  static async delete(ctx) {
    const result = await comment.destroy({ where: { id: ctx.params.id } });

    ctx.status = 200;
    ctx.body = {
      message: "deleted completed",
    };
  }
}

module.exports = CommentController;
