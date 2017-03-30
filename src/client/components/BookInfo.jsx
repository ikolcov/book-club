import React, { PropTypes } from 'react';
import styles from '../styles/bookinfo.scss';

const BookInfo = ({ book, toggleModal, handleDelete, children }) => (
  <main>
    <section className={styles.bookDetails}>
      <div className={styles.bookDetailsColumn}>
        <h2>{book.title}</h2>
        <img src={book.thumbnail || 'https://i.imgur.com/1Cmp3tI.png'} alt={book.title} />
        {book.isOwner &&
          <div>
            <button onClick={toggleModal}>Edit book</button>
            <button onClick={handleDelete}>Delete book</button>
          </div>}
      </div>
      <div className={styles.bookDetailsColumn}>
        <h3>{book.author}</h3>
        <p className={styles.bookDetailsDescription}>{book.description}</p>
        <a href={book.link}>More information at Google Books</a>
      </div>
    </section>
    {children}
  </main>
);

BookInfo.propTypes = {
  book: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default BookInfo;
