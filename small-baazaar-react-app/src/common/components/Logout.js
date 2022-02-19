import { useEffect } from 'react';
import AuthenticationService from '../services/AuthenticationService';

import { useHistory } from 'react-router-dom';
const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    AuthenticationService.logout();
    alert('Sucessfully Logged out');
    history.push('/home');
  }, []);
  return (
    <div>
      <h2>You are successfully logged out!</h2>
      <div className="container">Thank you for using our application</div>
    </div>
  );
};

export default Logout;
