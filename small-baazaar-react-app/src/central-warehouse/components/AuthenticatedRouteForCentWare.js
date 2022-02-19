import { Route, Redirect } from 'react-router-dom';
import { Component } from 'react';
import AuthenticationService from '../../common/services/AuthenticationService';

class AuthenticatedRouteForCentWare extends Component {
  render() {
    if (AuthenticationService.isUserLoggedInAsCentWare()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRouteForCentWare;
