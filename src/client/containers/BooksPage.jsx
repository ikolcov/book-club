import React, { Component } from 'react';
import Auth from '../modules/Auth';
import BooksList from '../components/BooksList';

class BooksPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      error: {},
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('/api/books', {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      });
      const books = await res.json();
      this.setState({ books });
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  }

  render() {
    return <BooksList books={this.state.books} />;
  }
}

export default BooksPage;
