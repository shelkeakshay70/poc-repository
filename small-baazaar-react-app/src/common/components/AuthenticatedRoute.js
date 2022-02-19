import AuthenticationService from '../services/AuthenticationService';
import { Route, Redirect } from 'react-router-dom';
import { Component } from 'react';

class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
