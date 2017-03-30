'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');

module.exports = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (ctx.headers.authorization) {
              _context.next = 3;
              break;
            }

            ctx.status = 401;
            return _context.abrupt('return', false);

          case 3:
            // get the last part from a authorization header string like "bearer token-value"
            token = ctx.headers.authorization.split(' ')[1];
            _context.prev = 4;
            _context.next = 7;
            return jwt.verify(token, process.env.JWT_SECRET);

          case 7:
            decoded = _context.sent;
            _context.next = 10;
            return User.findById(decoded.sub);

          case 10:
            user = _context.sent;

            if (!(user._id.toString() === decoded.sub)) {
              _context.next = 14;
              break;
            }

            ctx.state.user = user;
            return _context.abrupt('return', next());

          case 14:
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](4);

            ctx.status = 401;
            return _context.abrupt('return', false);

          case 20:
            return _context.abrupt('return', false);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=auth-check.js.map