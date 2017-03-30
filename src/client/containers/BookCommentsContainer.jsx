import React, { Component, PropTypes } from 'react';
import BookComments from '../components/BookComments';
import Auth from '../modules/Auth';

class BookCommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: '',
      error: {},
    };
  }

  handleChange = e => {
    this.setState({ field: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const body = JSON.stringify({
      content: this.state.field,
    });
    this.setState({ field: '' });
    try {
      const res = await fetch(`/api/books/${this.props.book.id}/comments`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${Auth.getToken()}`,
        },
        body,
      });
      const comments = await res.json();
      this.props.updateComments(comments);
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  };

  handleDelete = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/books/${this.props.book.id}/comments/${e.target.dataset.id}`, {
        method: 'delete',
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      });
      const comments = await res.json();
      this.props.updateComments(comments);
    } catch (error) {
      const err = JSON.parse(error.message);
      this.setState({ error: err });
    }
  };

  render() {
    return (
      <BookComments
        book={this.props.book}
        field={this.state.field}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

BookCommentsContainer.propTypes = {
  book: PropTypes.object.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default BookCommentsContainer;
