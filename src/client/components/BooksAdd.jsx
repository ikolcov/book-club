import React, { PropTypes } from 'react';
import BooksAddForm from './BooksAddForm';
import BooksResult from './BooksResult';
import styles from '../styles/main.scss';

const BooksAdd = ({ field, books, handleChange, handleSubmit, handleAdd }) => (
  <main className={styles.main}>
    <BooksAddForm field={field} handleChange={handleChange} handleSubmit={handleSubmit} />
    <BooksResult books={books} handleAdd={handleAdd} />
  </main>
);

BooksAdd.propTypes = {
  field: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default BooksAdd;
