import { Route, Redirect } from 'react-router-dom';
import { Component } from 'react';
import AuthenticationService from '../../common/services/AuthenticationService';

class AuthenticatedRouteForLocalWare extends Component {
  render() {
    if (AuthenticationService.isUserLoggedInAsLocalWare()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRouteForLocalWare;
