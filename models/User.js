
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique:true},
  email: { type: String, required: true },
  password: { type: String, required: true }
}
);


module.exports = mongoose.model("users", UserSchema);