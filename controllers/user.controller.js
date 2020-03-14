
const User = require('../models/user.model');

//****  function details users */
exports.user_list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
};


//****  function details user by his id */
exports.user_details_by_id = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};


//****  function details user by his username */
exports.user_details_by_username = function (req, res, next) {
    User.findOne({username : req.params.username}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};



// **** function creation user ****///
exports.user_create = function (req, res, next) {  

        req.assert('email', 'Email is not valid').isEmail();

     // Make sure this account doesn't already exist
  User.findOne({ email: req.body.email }, function (err, user) {
    // Make sure user doesn't already exist
    if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
  });
  //creation new user
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            email : req.body.email,
            country : req.body.country,
            avatar  : req.body.avatar,
            role : "membre" 
        }
    );

    user.save(function (err, createdUser) {
        if (err) return next(err);
        res.send(createdUser);
    });
};


// ***** update user **////
exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User Udpated successfully!');
    });
};


//     *****delete user*******
exports.user_delete = function (req, res) {

    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('User Deleted successfully!');
    });
};

