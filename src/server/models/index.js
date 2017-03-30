const mongoose = require('mongoose');

module.exports.connect = uri => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', () => process.exit(1));

  // eslint-disable-next-line global-require
  require('./user');
  // eslint-disable-next-line global-require
  require('./book');
};
