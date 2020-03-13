const user = require('./routes/user.route');
const event = require('./routes/event.route');

/* Requirements and Middleware*/
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({extended: true}));

const cors = require('cors');
var originsWhitelist = [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    'http://192.168.42.4:8080',
    'http://192.168.42.62:8080'
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
const mongoose = require('mongoose');
//-----------methode mongodb nrml

/*let mongoDB = 'mongodb://127.0.0.1:27017/eventydb';

mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/


//---------------connection with mongo atlas

const URI ="mongodb+srv://sahar:sahar0000@cluster0-0kbyt.mongodb.net/eventydb?retryWrites=true&w=majority";


mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true, });

/* ------------------ */



/**          Routes          **/
app.use('/user', user);
app.use('/event', event);

/* -------------------------- */




/* Initiating Server */
let port = 2222;
app.listen(port, () => {
    console.log('Server is up and running on http://localhost:' + port);
});