import React, { PropTypes } from 'react';
import styles from '../styles/bookcomments.scss';

const BookComments = ({ book, field, handleChange, handleSubmit, handleDelete }) => {
  const commentsSorted = book.comments.sort((a, b) => a._id < b._id);
  const formatDate = date => {
    const formatted = new Date(date).toString();
    return formatted.slice(0, formatted.indexOf('GMT') - 1);
  };
  return (
    <section className={styles.comments}>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Add comment to this book:</label>
          <textarea name="content" value={field} onChange={handleChange} />
        </div>
        <button>Add</button>
      </form>
      {commentsSorted &&
        commentsSorted.map(comment => (
          <div className={styles.comment} key={comment._id}>
            <div className={styles.header}>
              {comment.by}, {formatDate(comment.date)}
              {(book.isOwner || comment.isAuthor) &&
                <button onClick={handleDelete} data-id={comment._id}>Delete</button>}
            </div>
            <div className={styles.content}>
              {comment.content}
            </div>
          </div>
        ))}
    </section>
  );
};

BookComments.propTypes = {
  book: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default BookComments;
