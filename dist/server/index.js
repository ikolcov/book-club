'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var passport = require('koa-passport');
var path = require('path');
var serve = require('koa-static');
var view = require('koa-view');

var app = new Koa();
var router = new Router();

require('dotenv').config();
require('./models').connect(process.env.DB_URI);

app.use(serve(path.join(__dirname, '../../dist/client/')));
app.use(view(path.join(__dirname, '../../static')));
app.use(bodyParser());
app.use(passport.initialize());

var localSignupStrategy = require('./passport/local-signup');
var localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

var authCheckMiddleware = require('./middleware/auth-check');

router.use('/api', authCheckMiddleware);

var auth = require('./routes/auth');
var api = require('./routes/api');

router.use('/auth', auth.routes());
router.use('/api', api.routes());

router.all('*', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.render('index');

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
//# sourceMappingURL=index.js.map