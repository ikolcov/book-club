import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/main.scss';

const LoginForm = (
  {
    onSubmit,
    onChange,
    errors,
    successMessage,
    user,
  },
) => (
  <main className={styles.main}>
    <form action="/" onSubmit={onSubmit}>
      <h2>Login</h2>
      {successMessage && <p>{successMessage}</p>}
      {errors.summary && <span className={styles.error}>{errors.summary}</span>}
      <div className={styles.group}>
        <label htmlFor="email">E-mail</label>
        <input type="text" name="email" onChange={onChange} value={user.email} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.group}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={onChange} value={user.password} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
      <p>Dont have an account? <Link to="/signup">Create one</Link></p>
    </form>
  </main>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
