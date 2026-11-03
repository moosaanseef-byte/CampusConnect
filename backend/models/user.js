const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trm: true
        },
        course:{
            type: String,
            required: true,
             trim: true
        },
        password:{
            type: String,
            required: true,
            minlength:6,
            select: false
        },
        role:{
            type: String,
            enum: ["student","admin"],
            default: "student"
        }
    },
    { timestamp : true}
);
module.exports =  mongoose.model("User",userSchema);
