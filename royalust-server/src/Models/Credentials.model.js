const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
  username: {type: String, unique: true}, // String is shorthand for {type: String}
  pass: String,
  UserRef: {type: Schema.Types.ObjectId, ref: "Users",  required: false}
});
let CredentialsModel = mongoose.model('Credentials', CredentialSchema);
module.exports = CredentialsModel;
