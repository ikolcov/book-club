'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = require('koa-router');
var Book = require('../models/book');

var router = new Router();

// eslint-disable-next-line no-underscore-dangle
var isOwner = function isOwner(book, ctx) {
  return book.addedBy.toString() === ctx.state.user._id.toString();
};
var isAuthor = function isAuthor(comment, ctx) {
  return comment.authorId.toString() === ctx.state.user._id.toString();
};

router.get('/books', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
    var books;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Book.getBooks();

          case 3:
            books = _context.sent;

            ctx.body = 200;
            ctx.body = books;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            ctx.status = 500;
            ctx.body = { error: _context.t0 };

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/books/:bookId', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
    var bookId, book, id, _id, author, description, thumbnail, link, title, addedBy, comments, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            bookId = ctx.params.bookId;
            _context2.next = 4;
            return Book.getBook(bookId);

          case 4:
            book = _context2.sent;
            id = book.id, _id = book._id, author = book.author, description = book.description, thumbnail = book.thumbnail, link = book.link, title = book.title, addedBy = book.addedBy;
            comments = book.comments.map(function (comment) {
              var authorId = comment.authorId,
                  by = comment.by,
                  date = comment.date,
                  content = comment.content;

              var commentId = comment._id;
              return { _id: commentId, authorId: authorId, by: by, date: date, content: content, isAuthor: isAuthor(comment, ctx) };
            });
            result = {
              id: id,
              _id: _id,
              author: author,
              comments: comments,
              description: description,
              thumbnail: thumbnail,
              link: link,
              title: title,
              addedBy: addedBy,
              isOwner: isOwner(book, ctx)
            };

            ctx.status = 200;
            ctx.body = result;
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);

            ctx.status = 500;
            ctx.body = { error: _context2.t0 };

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 12]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

router.post('/books', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx) {
    var book, added;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            book = ctx.request.body;
            // eslint-disable-next-line no-underscore-dangle

            book.addedBy = ctx.state.user._id;
            _context3.prev = 2;
            _context3.next = 5;
            return Book.addBook(book);

          case 5:
            added = _context3.sent;

            ctx.status = 201;
            ctx.body = {
              message: 'New book created',
              location: '/books/' + added.id
            };
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](2);

            ctx.status = _context3.t0.code === 11000 ? 409 : 500;
            ctx.body = { error: _context3.t0 };

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 10]]);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

router.patch('/books/:bookId', function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx) {
    var bookId, book, title, author, description;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            bookId = ctx.params.bookId;
            book = ctx.request.body;

            if (isOwner(book, ctx)) {
              _context4.next = 5;
              break;
            }

            throw new Error('Access denied');

          case 5:
            title = book.title, author = book.author, description = book.description;
            _context4.next = 8;
            return Book.updateBook(bookId, { title: title, author: author, description: description });

          case 8:
            ctx.status = 204;
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);

            ctx.status = 500;
            ctx.body = { error: _context4.t0 };

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 11]]);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());

router.del('/books/:bookId', function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(ctx) {
    var bookId, book;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            bookId = ctx.params.bookId;
            _context5.next = 4;
            return Book.getBook(bookId);

          case 4:
            book = _context5.sent;

            if (isOwner(book, ctx)) {
              _context5.next = 7;
              break;
            }

            throw new Error('Access denied');

          case 7:
            _context5.next = 9;
            return Book.deleteBook(bookId);

          case 9:
            ctx.status = 204;
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5['catch'](0);

            ctx.status = 500;
            ctx.body = { error: _context5.t0 };

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 12]]);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}());

router.post('/books/:bookId/comments', function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(ctx) {
    var content, bookId, user, book, comments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            content = ctx.request.body.content;
            bookId = ctx.params.bookId;
            user = ctx.state.user;
            _context6.prev = 3;
            _context6.next = 6;
            return Book.addComment(bookId, user, content);

          case 6:
            book = _context6.sent;

            ctx.status = 201;
            comments = book.comments.map(function (comment) {
              var authorId = comment.authorId,
                  by = comment.by,
                  date = comment.date;

              var commentId = comment._id;
              var commentContent = comment.content;
              return {
                _id: commentId,
                authorId: authorId,
                by: by,
                date: date,
                content: commentContent,
                isAuthor: isAuthor(comment, ctx)
              };
            });

            ctx.body = comments;
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6['catch'](3);

            ctx.status = 500;
            ctx.body = { error: _context6.t0 };

          case 16:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[3, 12]]);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}());

router.del('/books/:bookId/comments/:commentId', function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(ctx) {
    var _ctx$params, bookId, commentId, book, commentIndex, result, comments;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _ctx$params = ctx.params, bookId = _ctx$params.bookId, commentId = _ctx$params.commentId;
            _context7.prev = 1;
            _context7.next = 4;
            return Book.getBook(bookId);

          case 4:
            book = _context7.sent;
            commentIndex = book.comments.findIndex(function (comment) {
              return comment._id.toString() === commentId;
            });

            if (!(!isAuthor(book.comments[commentIndex], ctx) && !isOwner(bookId, ctx))) {
              _context7.next = 8;
              break;
            }

            throw new Error('Access denied');

          case 8:
            _context7.next = 10;
            return Book.deleteComment(bookId, commentId);

          case 10:
            result = _context7.sent;
            comments = result.comments.map(function (comment) {
              var _id = comment._id,
                  authorId = comment.authorId,
                  by = comment.by,
                  date = comment.date,
                  content = comment.content;

              return { _id: _id, authorId: authorId, by: by, date: date, content: content, isAuthor: isAuthor(comment, ctx) };
            });

            ctx.status = 200;
            ctx.body = comments;
            _context7.next = 20;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7['catch'](1);

            ctx.status = 500;
            ctx.body = { error: _context7.t0 };

          case 20:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 16]]);
  }));

  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=api.js.map