import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';
import { Container, Row, Col } from 'react-bootstrap';
import CartService from '../../customer/services/CartService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginFailed, setIsLoginFailed] = useState();
  let history = useHistory();

  function navigateToHome() {
    if (AuthenticationService.isUserLoggedInAsCust()) {
      history.push({
        pathname: `/home`,
      });
      //add all cart products to DB after login
      CartService.setAllProductsInCartToDB();
    }
    if (AuthenticationService.isUserLoggedInAsCentWare()) {
      history.push({
        pathname: `/manage-requests`,
      });
    }
    if (AuthenticationService.isUserLoggedInAsLocalWare()) {
      history.push({
        pathname: `/customer-orders`,
      });
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      email === undefined ||
      password === undefined ||
      email === '' ||
      password === ''
    )
      alert('Both fields are mandatory');
    else {
      AuthenticationService.checkUserAuthentication(email, password)
        .then(function (response) {
          setIsLoginFailed(false);
          AuthenticationService.registerSuccessfulLogin(
            email,
            response.data.token
          );
          AuthenticationService.setupAxiosInterceptors(response.data.token);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoginFailed(true);
        });
      setTimeout(navigateToHome, 1000);
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            <div className="container">
              {isLoginFailed && (
                <div className="alert alert-warning">Bad credentials</div>
              )}
              <div className="form-group">
                <label className="font-weight-bold">Username:</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div>
                <label className="font-weight-bold">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <br></br>
              <button className="btn btn-success" onClick={handleLogin}>
                Login
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
