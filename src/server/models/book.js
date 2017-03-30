const mongoose = require('mongoose');

// define the User model schema
const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  author: String,
  description: String,
  thumbnail: String,
  link: String,
  title: String,
  addedBy: mongoose.Schema.Types.ObjectId,
  comments: [
    {
      authorId: mongoose.Schema.Types.ObjectId,
      by: String,
      date: {
        type: Date,
        default: Date.now,
      },
      content: String,
    },
  ],
});

const Book = mongoose.model('Book', BookSchema);

Book.addBook = function addBook(book) {
  return new this(book).save();
};

Book.getBooks = function getBooks() {
  return Book.find({});
};

Book.getBook = function getBook(id) {
  return Book.findOne({ id });
};

Book.updateBook = function updateBook(id, book) {
  return Book.findOneAndUpdate({ id }, { $set: book });
};

Book.deleteBook = function deleteBook(id) {
  return Book.findOneAndRemove({ id });
};

Book.addComment = async function addComment(id, user, content) {
  const book = await Book.getBook(id);
  const by = `${user.name} [${user.email}]`;
  const authorId = user._id;
  book.comments = [...book.comments, { authorId, by, content }];
  book.markModified('comments');
  return book.save();
};

Book.deleteComment = async function deleteComment(id, commentId) {
  const book = await Book.getBook(id);
  const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId);
  book.comments.splice(commentIndex, 1);
  book.markModified('comments');
  return book.save();
};

module.exports = Book;
