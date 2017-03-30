'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// define the User model schema
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function (next) {
  var user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(function (saltError, salt) {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, function (hashError, hash) {
      if (hashError) {
        return next(hashError);
      }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map