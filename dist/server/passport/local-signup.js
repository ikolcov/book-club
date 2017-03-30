'use strict';

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
    password: password.trim(),
    name: req.body.name.trim()
  };
  var newUser = new User(userData);
  newUser.save(function (err) {
    if (err) {
      return done(err);
    }
    return done(null);
  });
});
//# sourceMappingURL=local-signup.js.map