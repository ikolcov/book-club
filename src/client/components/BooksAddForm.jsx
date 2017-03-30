import React, { PropTypes } from 'react';
import styles from '../styles/bookadd.scss';

const BooksAddForm = ({ field, handleChange, handleSubmit }) => (
  <form action="/" onSubmit={handleSubmit}>
    <h2>Add a book</h2>
    <p>
      <label htmlFor="name">Enter book name to search and then choose the book from a list:</label>
      <input
        type="text"
        name="name"
        value={field}
        onChange={handleChange}
        className={styles.inputField}
      />
    </p>
    <button>Submit</button>
  </form>
);

BooksAddForm.propTypes = {
  field: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BooksAddForm;
