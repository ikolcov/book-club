'use strict';

var mongoose = require('mongoose');

module.exports.connect = function (uri) {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error: ' + err);
    process.exit(1);
  });

  // eslint-disable-next-line global-require
  require('./user');
  // eslint-disable-next-line global-require
  require('./book');
};
//# sourceMappingURL=index.js.map