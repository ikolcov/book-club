'use strict';

var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, function (req, email, password, done) {
  var userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      var error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, function (passwordErr, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        var _error = new Error('Incorrect email or password');
        _error.name = 'IncorrectCredentialsError';

        return done(_error);
      }

      var payload = {
        // eslint-disable-next-line no-underscore-dangle
        sub: user._id
      };

      // create a token string
      var token = jwt.sign(payload, process.env.JWT_SECRET);
      var data = {
        name: user.name
      };

      return done(null, token, data);
    });
  });
});
//# sourceMappingURL=local-login.js.map