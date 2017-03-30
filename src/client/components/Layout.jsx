import React, { PropTypes } from 'react';
import Aside from './Aside';
import styles from '../styles/layout.scss';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <img src="https://i.imgur.com/ZpFz7Z4.jpg" alt="Book Club" />
    </header>
    <Aside />
    {children}
    <footer className={styles.footer}>
      © 2017 Book Club, Inc.
      <br />
      Powered by{' '}
      <a href="https://developers.google.com/books/">Google Books API</a>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
