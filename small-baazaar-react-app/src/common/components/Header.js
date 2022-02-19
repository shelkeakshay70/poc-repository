import logo from '../../images/logo.PNG';
import { Link, withRouter } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';
import CartService from '../../customer/services/CartService';

const Header = () => {
  let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  let isUserLoggedInAsCust = AuthenticationService.isUserLoggedInAsCust();
  let isUserLoggedInAsCentWare = AuthenticationService.isUserLoggedInAsCentWare();
  let isUserLoggedInAsLocalWare = AuthenticationService.isUserLoggedInAsLocalWare();
  let name = sessionStorage.getItem('name');
  let cartProductsQuantity = CartService.getProductsLength();
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li>
            {(!isUserLoggedIn || isUserLoggedInAsCust) && (
              <Link to="/home">
                <img
                  className="App-logo img-fluid"
                  src={logo}
                  alt="brand-logo"
                ></img>
              </Link>
            )}
            {isUserLoggedInAsCentWare && (
              <Link to="/manage-requests">
                <img
                  className="App-logo img-fluid"
                  src={logo}
                  alt="brand-logo"
                ></img>
              </Link>
            )}
            {isUserLoggedInAsLocalWare && (
              <Link to="/customer-orders">
                <img
                  className="App-logo img-fluid"
                  src={logo}
                  alt="brand-logo"
                ></img>
              </Link>
            )}
          </li>
        </ul>
        <ul className="navbar-nav navbar-collapse justify-content-end">
          <li>
            {!isUserLoggedIn && (
              <Link className="nav-link" to="/cart-details">
                Cart: {cartProductsQuantity}
              </Link>
            )}
            {isUserLoggedInAsCust && (
              <Link className="nav-link" to="/cart-details">
                Cart: {cartProductsQuantity}
              </Link>
            )}
          </li>
          <li>
            {!isUserLoggedIn && (
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            )}
          </li>
          <li>
            {!isUserLoggedIn ? (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            ) : (
              <Link className="nav-link" to="/profile">
                Hello, {name}
              </Link>
            )}
          </li>

          {isUserLoggedIn && (
            <li>
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
