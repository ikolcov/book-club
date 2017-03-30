import React, { Component, PropTypes } from 'react';
import SignupForm from '../components/SignupForm';

class SignupPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
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
      const res = await fetch('/auth/signup', {
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
      localStorage.setItem('successMessage', data.message);
      this.context.router.replace('/login');
    } catch (errors) {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <SignupForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignupPage;
