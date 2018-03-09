const express = require('express');
var path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./utils/config');
const app = express();
const mongoose = require('mongoose');
const initPassport = require('./passport/init');
var routes = require('./routes/index')(passport);

// // Connect to DB-Local:
// NOTE: Uncomment below line if you want to save data locally
 mongoose.connect(config.db.local);

// Connect to DB-Cloud
// NOTE: Uncomment below line if you want to save data in the cloud(Mlab)
//mongoose.connect(config.db.mlab);

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: config.sessionSecret,
    resave: false, // forces sesseion to be saved even when there was no change
    saveUninitialized: false // forces uninitialized sessions to be saved
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// for using routs
app.use('/api', routes);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}



module.exports = app;
