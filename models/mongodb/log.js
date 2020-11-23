const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NotifSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "user id is required"],
    },
    log: [
      {
        info: {
          type: String,
          required: [true, "info is required"],
        },

        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Log", NotifSchema, "Log");
