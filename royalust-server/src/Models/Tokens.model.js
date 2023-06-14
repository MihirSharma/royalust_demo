const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokensSchema = new Schema({
  token: {type: String, unique: true, required: true}
});
let TokensModel = mongoose.model('Tokens', TokensSchema);
module.exports = TokensModel;
