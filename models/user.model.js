const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    country : {type: String, required: true},
    avatar : {type: String, required: false},
    role : {type: String},
    createdAt: {
        type: Date,
        default: Date.now()
      }
    
    });


module.exports = mongoose.model('User', UserSchema);