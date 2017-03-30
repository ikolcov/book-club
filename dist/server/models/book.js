'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

// define the User model schema
var BookSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  author: String,
  description: String,
  thumbnail: String,
  link: String,
  title: String,
  addedBy: mongoose.Schema.Types.ObjectId,
  comments: [{
    authorId: mongoose.Schema.Types.ObjectId,
    by: String,
    date: {
      type: Date,
      default: Date.now
    },
    content: String
  }]
});

var Book = mongoose.model('Book', BookSchema);

Book.addBook = function (book) {
  return new this(book).save();
};

Book.getBooks = function () {
  return Book.find({});
};

Book.getBook = function (id) {
  return Book.findOne({ id: id });
};

Book.updateBook = function (id, book) {
  return Book.findOneAndUpdate({ id: id }, { $set: book });
};

Book.deleteBook = function (id) {
  return Book.findOneAndRemove({ id: id });
};

Book.addComment = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id, user, content) {
    var book, by, authorId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Book.getBook(id);

          case 2:
            book = _context.sent;
            by = user.name + ' [' + user.email + ']';
            authorId = user._id;

            book.comments = [].concat(_toConsumableArray(book.comments), [{ authorId: authorId, by: by, content: content }]);
            book.markModified('comments');
            return _context.abrupt('return', book.save());

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

Book.deleteComment = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, commentId) {
    var book, commentIndex;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Book.getBook(id);

          case 2:
            book = _context2.sent;
            commentIndex = book.comments.findIndex(function (comment) {
              return comment._id.toString() === commentId;
            });

            book.comments.splice(commentIndex, 1);
            book.markModified('comments');
            return _context2.abrupt('return', book.save());

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = Book;
//# sourceMappingURL=book.js.map