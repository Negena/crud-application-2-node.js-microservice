const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true,
    unique: true
  },
  gender: String,
  status: String
});

const userDb = mongoose.model("userdb", schema);

module.exports = userDb;
