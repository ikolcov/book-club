const Router = require('koa-router');
const Book = require('../models/book');

const router = new Router();

// eslint-disable-next-line no-underscore-dangle
const isOwner = (book, ctx) => book.addedBy.toString() === ctx.state.user._id.toString();
const isAuthor = (comment, ctx) => comment.authorId.toString() === ctx.state.user._id.toString();

router.get('/books', async ctx => {
  try {
    const books = await Book.getBooks();
    ctx.body = 200;
    ctx.body = books;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

router.get('/books/:bookId', async ctx => {
  try {
    const { bookId } = ctx.params;
    const book = await Book.getBook(bookId);
    const { id, _id, author, description, thumbnail, link, title, addedBy } = book;
    const comments = book.comments.map(comment => {
      const { authorId, by, date, content } = comment;
      const commentId = comment._id;
      return { _id: commentId, authorId, by, date, content, isAuthor: isAuthor(comment, ctx) };
    });
    const result = {
      id,
      _id,
      author,
      comments,
      description,
      thumbnail,
      link,
      title,
      addedBy,
      isOwner: isOwner(book, ctx),
    };
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

router.post('/books', async ctx => {
  const book = ctx.request.body;
  // eslint-disable-next-line no-underscore-dangle
  book.addedBy = ctx.state.user._id;
  try {
    const added = await Book.addBook(book);
    ctx.status = 201;
    ctx.body = {
      message: 'New book created',
      location: `/books/${added.id}`,
    };
  } catch (error) {
    ctx.status = error.code === 11000 ? 409 : 500;
    ctx.body = { error };
  }
});

router.patch('/books/:bookId', async ctx => {
  try {
    const { bookId } = ctx.params;
    const book = ctx.request.body;
    if (!isOwner(book, ctx)) {
      throw new Error('Access denied');
    }
    const { title, author, description } = book;
    await Book.updateBook(bookId, { title, author, description });
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

router.del('/books/:bookId', async ctx => {
  try {
    const { bookId } = ctx.params;
    const book = await Book.getBook(bookId);
    if (!isOwner(book, ctx)) {
      throw new Error('Access denied');
    }
    await Book.deleteBook(bookId);
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

router.post('/books/:bookId/comments', async ctx => {
  const { content } = ctx.request.body;
  const { bookId } = ctx.params;
  const user = ctx.state.user;
  try {
    const book = await Book.addComment(bookId, user, content);
    ctx.status = 201;
    const comments = book.comments.map(comment => {
      const { authorId, by, date } = comment;
      const commentId = comment._id;
      const commentContent = comment.content;
      return {
        _id: commentId,
        authorId,
        by,
        date,
        content: commentContent,
        isAuthor: isAuthor(comment, ctx),
      };
    });
    ctx.body = comments;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

router.del('/books/:bookId/comments/:commentId', async ctx => {
  const { bookId, commentId } = ctx.params;
  try {
    const book = await Book.getBook(bookId);
    const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId);
    if (!isAuthor(book.comments[commentIndex], ctx) && !isOwner(bookId, ctx)) {
      throw new Error('Access denied');
    }
    const result = await Book.deleteComment(bookId, commentId);
    const comments = result.comments.map(comment => {
      const { _id, authorId, by, date, content } = comment;
      return { _id, authorId, by, date, content, isAuthor: isAuthor(comment, ctx) };
    });
    ctx.status = 200;
    ctx.body = comments;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

module.exports = router;
