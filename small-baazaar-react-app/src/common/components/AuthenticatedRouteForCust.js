import AuthenticationService from '../services/AuthenticationService';
import { Route, Redirect } from 'react-router-dom';
import { Component } from 'react';

class AuthenticatedRouteForCust extends Component {
  render() {
    if (AuthenticationService.isUserLoggedInAsCust()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRouteForCust;
