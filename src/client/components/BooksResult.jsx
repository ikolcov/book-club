import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/booklist.scss';

const BooksResult = ({ books, handleAdd }) => {
  const list = books.map((book, i) => (
    <tr className={styles.bookListRow} key={book.id}>
      <td>
        <img
          src={book.thumbnail || 'https://i.imgur.com/1Cmp3tI.png'}
          title={book.description}
          alt={book.title}
        />
      </td>
      <td>
        {handleAdd
          ? <a href={book.link}>{book.title}</a>
          : <Link to={`/books/${book.id}`}>{book.title}</Link>}
      </td>
      <td>{book.author}</td>
      {handleAdd && <td><button data-index={i} onClick={handleAdd}>Add</button></td>}
    </tr>
  ));
  return (
    <table className={styles.bookList}>
      <tbody>
        {list}
      </tbody>
    </table>
  );
};

BooksResult.propTypes = {
  books: PropTypes.array.isRequired,
  handleAdd: PropTypes.func,
};

BooksResult.defaultProps = {
  handleAdd: undefined,
};

export default BooksResult;
