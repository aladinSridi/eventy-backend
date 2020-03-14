const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user.model').Schema;

let EventSchema = new Schema({
    date: {type: String, required: [true, 'Date address is required.']},
    title: {type: String, required: [true, 'Title address is required.'], max: 100},
    country: {type: String, required: [true, 'Country address is required.'], max: 100}, 
    description: {type: String, required: [true, 'Description address is required.']},
    cost: {type: String, required: [true, 'Cost address is required.']},
    infoline: {type: String, required: [true, 'Infoline address is required.']},
    organizer: {type: String, required: [true, 'Organizer address is required.']},
    invitees: [{ type: Schema.Types.ObjectId, ref: 'User', default : [] }],
    inviteesLength : { type : Number, required: true, default: 0 },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User',  default : [] }],
    attendeesLength : { type : Number, required: true, default: 0 },
    created_at : { type : Date, required: true, default: Date.now },
    created_by : { type : Schema.Types.ObjectId, required: true },
    qrcodetxt: {type: String, defaul : ''}
});

module.exports = mongoose.model('Event', EventSchema);