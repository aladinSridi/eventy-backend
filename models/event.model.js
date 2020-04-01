const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user.model').Schema;

let EventSchema = new Schema({
    title: {type: String, required: [true, 'Title address is required.'], max: 100},
    description: {type: String, required: [true, 'Description address is required.']},
    date: {type: String, required: [true, 'Date address is required.']},
    country: {type: String, required: [true, 'Country address is required.'], max: 100},
    category: {type: String, required: [true, 'Category address is required.'], max: 100},
    cost: {type: String, required: [true, 'Cost address is required.']},
    infoline: {type: String, required: [true, 'Infoline address is required.']},
    organizer: {type: String, required: [true, 'Organizer address is required.']},
    created_by : { type : Schema.Types.ObjectId, required: true },
    created_at : { type : Date, required: true, default: Date.now },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User',  default : [] }],
    attendeesLength : { type : Number, required: true, default: 0 },
    picture: {type: String, required: [true, 'Picture is required']}
});

module.exports = mongoose.model('Event', EventSchema);