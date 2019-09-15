const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    userid: String,
    phone: String,
    mail: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);