const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    email: {type: String, required: true},
    country : {type: String, required: true},
    createdEvents : [{type: Schema.Types.ObjectId, ref: 'Event', default : [] }],
    participatingToEvents: [{type: Schema.Types.ObjectId, ref: 'Event', default : [] }],
    invitedToEvents : [{type: Schema.Types.ObjectId, ref: 'Event', default : [] }]
});


module.exports = mongoose.model('User', UserSchema);