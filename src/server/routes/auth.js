const Router = require('koa-router');
const validator = require('validator');
const passport = require('koa-passport');

const router = new Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (
    !payload ||
    typeof payload.name !== 'string' ||
    payload.name.trim().length === 0
  ) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    payload.email.trim().length === 0
  ) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (ctx, next) => {
  const validationResult = validateSignupForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
    return false;
  }

  return passport.authenticate('local-signup', err => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        ctx.status = 409;
        ctx.body = {
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        };
        return false;
      }
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'Could not process the form.'
      };
      return false;
    }
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    };
    return true;
  })(ctx, next);
});

router.post('/login', (ctx, next) => {
  const validationResult = validateLoginForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
    return false;
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: err.message
        };
        return false;
      }
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'Could not process the form.'
      };
      return false;
    }
    ctx.body = {
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    };
    return true;
  })(ctx, next);
});

module.exports = router;
