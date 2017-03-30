import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/main.scss';

const SignupForm = (
  {
    onSubmit,
    onChange,
    errors,
    user,
  },
) => (
  <main className={styles.main}>
    <form action="/" onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      {errors.summary && <span className={styles.error}>{errors.summary}</span>}
      <div className={styles.group}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={onChange} value={user.name} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
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
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </form>
  </main>
);

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignupForm;
