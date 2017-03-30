import React from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import styles from '../styles/aside.scss';

const giveMeError;

const Aside = () => {
  if (Auth.isUserAuthenticated()) {
    return (
      <aside className={styles.aside}>
        <IndexLink to="/books" className={styles.link} activeClassName={styles.linkActive}>
          All books
        </IndexLink>
        <Link to="/books/add" className={styles.link} activeClassName={styles.linkActive}>
          Add a book
        </Link>
        <Link to="/logout" className={styles.link} activeClassName={styles.linkActive}>
          Logout
        </Link>
      </aside>
    );
  }
  return (
    <aside className={styles.aside}>
      <IndexLink to="/" className={styles.link} activeClassName={styles.linkActive}>
        Home
      </IndexLink>
      <Link to="/signup" className={styles.link} activeClassName={styles.linkActive}>
        Signup
      </Link>
      <Link to="/login" className={styles.link} activeClassName={styles.linkActive}>
        Log in
      </Link>
    </aside>
  );
};

export default Aside;
