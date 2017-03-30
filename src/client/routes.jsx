import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import BooksPage from './containers/BooksPage';
import BooksAddPage from './containers/BooksAddPage';
import BookPage from './containers/BookPage';
import NotFound from './components/NotFound';
import Auth from './modules/Auth';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={Home}
      onEnter={(nextState, replace) => {
        if (Auth.isUserAuthenticated()) {
          replace('/books');
        }
      }}
    />
    <Route path="/books" component={BooksPage} />
    <Route path="/books/add" component={BooksAddPage} />
    <Route path="/books/:bookId" component={BookPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route
      path="/logout"
      onEnter={(nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }}
    />
    <Route path="*" component={NotFound} />
  </Route>
);
