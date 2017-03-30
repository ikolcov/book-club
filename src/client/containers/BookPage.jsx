import React, { Component, PropTypes } from 'react';
import BookInfo from '../components/BookInfo';
import BookModalContent from '../components/BookModalContent';
import BookCommentsContainer from './BookCommentsContainer';
import Auth from '../modules/Auth';

class BookPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      book: {
        title: 'The book was not found',
        author: 'No author',
        description: 'No description',
        comments: [],
      },
      error: {},
      modalOpened: false,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(`/api/books/${this.props.params.bookId}`, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      });
      const book = await res.json();
      if (book.title) this.setState({ book });
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  }

  toggleModal = e => {
    if (e) e.preventDefault();
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  handleChange = e => {
    const field = e.target.name;
    const book = this.state.book;
    book[field] = e.target.value;
    this.setState({ book });
  };

  handleEdit = async e => {
    e.preventDefault();
    const { title, author, description, addedBy } = this.state.book;
    const body = JSON.stringify({ title, author, description, addedBy });
    try {
      const res = await fetch(`/api/books/${this.state.book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${Auth.getToken()}`,
        },
        body,
      });
      if (res.status === 204) {
        this.setState({ modalOpened: false });
      }
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  };

  handleDelete = async () => {
    try {
      const res = await fetch(`/api/books/${this.state.book.id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${Auth.getToken()}`,
        },
      });
      if (res.status === 204) {
        this.context.router.push('/books');
      }
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  };

  updateComments = comments => {
    const book = { ...this.state.book, comments };
    this.setState({ book });
  };

  render() {
    return (
      <div className="bookpage">
        <BookInfo
          book={this.state.book}
          toggleModal={this.toggleModal}
          handleDelete={this.handleDelete}
        >
          <BookCommentsContainer book={this.state.book} updateComments={this.updateComments} />
        </BookInfo>
        <BookModalContent
          book={this.state.book}
          handleChange={this.handleChange}
          handleEdit={this.handleEdit}
          toggleModal={this.toggleModal}
          modalOpened={this.state.modalOpened}
        />
      </div>
    );
  }
}

BookPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default BookPage;
