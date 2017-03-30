import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import BooksResult from './BooksResult';
import styles from '../styles/main.scss';

const BooksList = ({ books }) => (
  <main className={styles.main}>
    <h2>All books</h2>
    <p>
      Choose a book from the list, or <Link to="/books/add">add one</Link>.
    </p>
    <BooksResult books={books} />
  </main>
);

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BooksList;
