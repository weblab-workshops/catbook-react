const mongoose = require('mongoose');

// set up mongoDB connection
// Example URI ---> mongodb://aaron:badpassword123@ds237707.mlab.com:37707/catbookdb';
const mongoURL = 'mongodb://shannen:goodpassword123@ds147344.mlab.com:47344/catbook-react';
const options = {
  useMongoClient: true
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
