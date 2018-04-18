import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passPortLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
    email: String,
    password: String
});

Account.plugin(passPortLocalMongoose);
module.exports = mongoose.model('Account', Account);

