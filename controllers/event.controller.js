const Event = require('../models/event.model');


exports.event_list = function (req, res, next) {
    Event.find({}, function (err, events) {
        if (err) return next(err);
        res.send(events);
    });
};



exports.event_details_by_id = function (req, res, next) {
    Event.findById(req.params.id, function (err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_latest = function (req, res, next) {
    Event.findOne().sort('-created_at').exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_trending = function (req, res, next) {
    Event.findOne().sort('-attendeesLength').exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_closest = function (req, res, next) {
    Event.find({country : req.params.country}).sort('-attendeesLength').limit(1).exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_random = function (req, res, next) {
    Event.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
    
        Event.findOne().skip(random).exec(
        function (err, event) {
            if (err) return next(err);
            res.send(event);
        });
    });
};



exports.event_create = function (req, res, next) {  
    let event = new Event(
        {
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost,
            infoline: req.body.infoline,
            organizer: req.body.organizer,
            invitees: req.body.invitees,
            inviteesLength : req.body.inviteesLength,
            attendees: req.body.attendees,
            attendeesLength: req.body.attendeesLength,
            created_at : req.body.created_at,
            country : req.body.country,
            created_by : req.body.created_by,
            qrcodetxt : req.body.qrcodetxt
        }
    );

    event.save(function (err, savedEvent) {
        if (err) return next(err);
        res.send(savedEvent);
    });

};



exports.event_update = function (req, res,next) {
    Event.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) return next(err);
        res.send('Event Udpated successfully!');
    });
};



exports.event_delete = function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Event Deleted successfully!');
    });
};