const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const config = require('./config');

const bcrypt = require('bcrypt');

module.exports = new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (!user) 
        return done(null, false);
        
      bcrypt.compare(password, user.password, (errCompare, match) => {
        if (err || errCompare) 
          return done(err);

        if (!user) 
          return done(null, false);

        if (match && user.username === username) 
          return done(null, user);
        else
          return done(null, false);
      });
    });
  }
);