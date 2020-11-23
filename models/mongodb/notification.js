const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NotifSchema = new Schema(
    {
        user: {
            type: String,
            required: [true, "user is required"]
          },
        notification:[{
            info: {
                type:String,
                required: [true, "Info Notif harap diisi!"]
            },
            link:{
                type:String
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }]
    }, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
); 

module.exports =  mongoose.model("Notification", NotifSchema, "Notification");