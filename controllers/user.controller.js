const User = require('../models/user.model');


exports.user_list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
};



exports.user_details_by_id = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};



exports.user_details_by_username = function (req, res, next) {
    User.findOne({username : req.params.username}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};



exports.user_details_by_username_and_password = function (req, res, next) {
    User.findOne({username : req.params.username, password : req.params.password}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};



exports.user_create = function (req, res, next) {  
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            email : req.body.email,
            country : req.body.country
        }
    );

    user.save(function (err, createdUser) {
        if (err) return next(err);
        res.send(createdUser);
    });
};



exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User Udpated successfully!');
    });
};



exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('User Deleted successfully!');
    });
};