const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, unique: true}, // String is shorthand for {type: String}
  email: String,
  address: String,
  phone: String,
  job_type: { type: String, enum: ["full time", "part time", "contract"] },
  dateCreated: { type: Date, default: Date.now },
  active: {type: Boolean, default: true},
  credRef: {type: Schema.Types.ObjectId, ref: "Credentials" }
});

let UsersModel = mongoose.model('Users', UserSchema);

module.exports = UsersModel;