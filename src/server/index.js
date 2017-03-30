require('babel-polyfill');

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const path = require('path');
const serve = require('koa-static');
const view = require('koa-view');

const giveMeError;

const app = new Koa();
const router = new Router();

require('./models').connect(process.env.DB_URI);

app.use(serve(path.join(__dirname, '../../dist/client/')));
app.use(view(path.join(__dirname, '../../static')));
app.use(bodyParser());
app.use(passport.initialize());

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');

router.use('/api', authCheckMiddleware);

const auth = require('./routes/auth');
const api = require('./routes/api');

router.use('/auth', auth.routes());
router.use('/api', api.routes());

router.all('*', async ctx => {
  await ctx.render('index');
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
