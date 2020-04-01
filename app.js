/* Models */
const user = require('./routes/user.route');
const event = require('./routes/event.route');


/* Express */
const express = require('express');
const app = express();


/* BodyParser Middleware */
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({extended: true}));


/* Cors Configuration */
const cors = require('cors');
var originsWhitelist = [
    'http://localhost:4200',
    'http://127.0.0.1:4200'
];
var corsOptions = {
    origin : function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials : true
}
app.use(cors(corsOptions));


/* MongoDB Connection */
/*  Locally - Don't forget to change the database name (EventyWebDB) to your satisfaction */
const mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1:27017/EventyWebDB';

mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*  Remotly - No further modifications required */
/*
const URI ="mongodb+srv://sahar:sahar0000@cluster0-0kbyt.mongodb.net/eventydb?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true, });
*/


/* Routes */
app.use('/user', user);
app.use('/event', event);


/* Initiating Server */
let port = 2222;
app.listen(port, () => {
    console.log('Server is up and running on http://localhost:' + port);
});