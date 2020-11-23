const { like } = require("../models/like");
const Log = require("../models/mongodb/log");
const Notification = require("../models/mongodb/notification");
class LikeControllers {
  static async likeSystem(ctx) {
    const { postId } = ctx.request.body;

    const data = await like.find({where: {postId, userId : ctx.decoded.id}})
    if( data == null){
      await like
      .create({ postId })
      .then((result) => {
        ctx.status = 200;
        ctx.body = {
          message: "like completed",
        };
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
      });
    }else{
      await like.destroy({
        where: {postId, userId : ctx.decoded.id},
        returning: true,
      });
      ctx.status = 200
      ctx.body = {message: "dislike completed"}
    }
    
  }
}

module.exports = LikeControllers;
