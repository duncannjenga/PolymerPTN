const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

// and create our instances
const app = express();
const config = require('./config/database');
const CommentController = require('./controllers/hotel');
const UserController = require('./controllers/user');
const AvailabilityController = require('./controllers/availability');
const AllocationController = require('./controllers/allocation');
const BlockingController = require('./controllers/blocking');
const AgentController = require('./controllers/agent');
const GroupController = require('./controllers/group');
const BookingController = require('./controllers/booking');

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 8080;

// now we should configure the API to use bodyParser and look for JSON data in the request body
// db config — set your URI from mLab in database.js


mongoose.connect(config.db, { replicaSet: 'Cluster0-shard-0', auth: { authdb: "admin" }, useNewUrlParser: true });
// mongoose.set('debug', true);
// mongoose.connect(config.db,{useNewUrlParser: true});
mongoose.connection.on('connected', () => { console.log('MongoDB connection established\nReady...') });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error:' + err) });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/availability', AvailabilityController);
app.use('/allocation', AllocationController);
app.use('/agent', AgentController);
app.use('/blocking', BlockingController);
app.use('/hotel', CommentController);
app.use('/user', UserController);
app.use('/group', GroupController);
app.use('/booking', BookingController);
app.get('/api/launch', (req, res, next) => res.send('boom'));
app.get('/logout', function (req, res) {
  req.logout();
  res.json({ success: true, user: null });
});

if (app.get('env') === 'development') {
  /**
   * Serve static files from root directory
   */
  app.use(express.static(__dirname));
  app.get('*', function (req, res) {
    res.sendFile("index.html", { root: __dirname });
  });
} else {
  /**
   * Serve static files from build directory
   */
  app.use(express.static(__dirname + '/build/es6-unbundled'));
  app.get('*', function (req, res) {
    res.sendFile("/build/es6-unbundled/index.html", { root: __dirname });
  });
}


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));