import React, { Component, PropTypes } from 'react';
import Auth from '../modules/Auth';
import BooksAdd from '../components/BooksAdd';

class BooksAddPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      field: '',
      books: [],
      error: {},
    };
  }

  handleChange = e => {
    this.setState({ field: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const q = this.state.field;
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en`);
      const data = await res.json();
      const books = data.items.map(book => ({
        id: book.id,
        author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : null,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
        link: book.volumeInfo.previewLink,
        title: book.volumeInfo.title,
      }));
      this.setState({ books });
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  };

  handleAdd = async e => {
    const index = e.target.dataset.index;
    const book = this.state.books[index];
    const body = JSON.stringify(book);
    try {
      const res = await fetch('/api/books', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${Auth.getToken()}`,
        },
        body,
      });
      const data = await res.json();
      if (data.error) throw new Error(JSON.stringify(data.error));
      if (data.location) this.context.router.push(data.location);
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
      // duplicate query redirects to existing book
      if (err.code === 11000) {
        this.context.router.push(`/books/${book.id}`);
      }
    }
  };

  render() {
    return (
      <BooksAdd
        field={this.state.field}
        books={this.state.books}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleAdd={this.handleAdd}
      />
    );
  }
}

BooksAddPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default BooksAddPage;
