import React, { PropTypes } from 'react';
import styles from '../styles/modal.scss';

const BookModalContent = ({ book, handleEdit, handleChange, modalOpened, toggleModal }) => (
  <div className={`${styles.modalContent} ${modalOpened && styles.modalContentShow}`}>
    <form onSubmit={handleEdit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" value={book.title} onChange={handleChange} name="title" />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" value={book.author} onChange={handleChange} name="author" />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea type="text" value={book.description} onChange={handleChange} name="description" />
      </div>
      <button>Submit</button>
      <a href="" className={styles.modalContentClose} onClick={toggleModal}>
        <img src="https://image.flaticon.com/icons/svg/61/61155.svg" alt="Close" />
      </a>
    </form>
  </div>
);

BookModalContent.propTypes = {
  book: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default BookModalContent;
