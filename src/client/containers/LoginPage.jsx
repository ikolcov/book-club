import React, { Component, PropTypes } from 'react';
import LoginForm from '../components/LoginForm';
import Auth from '../modules/Auth';

class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };
  }

  changeUser = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  };

  processForm = async event => {
    event.preventDefault();
    const body = JSON.stringify(this.state.user);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
      const data = await res.json();
      if (!data.success) {
        await Promise.reject({ ...data.errors, summary: data.message });
      }
      this.setState({ errors: {} });
      Auth.authenticateUser(data.token);
      this.context.router.replace('/');
    } catch (errors) {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
