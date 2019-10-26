const mongoose = require('mongoose');

// set up mongoDB connection (this one is alex's)
const mongoURL = 'mongodb+srv://user:user@cluster0-blaup.mongodb.net/test?retryWrites=true&w=majority';
const options = { useNewUrlParser: true };
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
