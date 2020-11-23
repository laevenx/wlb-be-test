const errValidator = (err) => {
    let errList = [];
    for (let e in err.errors) {
      errList.push(err.errors[e].message);
    }
    return errList.join(", ");
  };
  
  module.exports =async (err, ctx, next) => {
    console.log(err.message)
    // if (err.name === "ValidationError") {
    //   message = errValidator(err);
    //   ctx.status = 400;
    //   ctx.body= { message, status }
    // } else {
    //   let msg = err.message;
      ctx.status = 400;
      ctx.body = err.message
    //   console.log(msg);
    //   res.status(400).json(err);
    // }
  };
  