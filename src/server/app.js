// libraries
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session')
const express = require('express');
const path = require('path');

// local dependencies
const db = require('./db');
const passport = require('./passport');
// react-router will handle front-end views
// const views = require('./routes/views'); 
const api = require('./routes/api');

// initialize express app
const app = express();
const publicPath = path.resolve(__dirname, '..', '..', 'dist');

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up sessions
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// set routes
// app.use('/', views);
// app.use('/u/profile?', function (req, res, next) {
//   next();
// });
app.use('/api', api );
// app.use('/static', express.static('public'));
app.use(express.static(publicPath));

// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

// port config
const port = 3000; // config variable
const server = http.Server(app);
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});