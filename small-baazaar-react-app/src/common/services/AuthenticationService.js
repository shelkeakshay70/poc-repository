import axios from 'axios';
import { API_SERVER_URL } from '../constants/Constants';
import CartService from '../../customer/services/CartService';

class AuthenticationService {
  registerSuccessfulLogin(email, token) {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', 'Bearer ' + token);

    //go get user details from DB
    axios
      .get(`${API_SERVER_URL}/user-details/${email}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        sessionStorage.setItem('user_id', response.data.id);
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('user_role', response.data.userRole);
      })
      .catch((error) => {
        console.log(error);
      });

    //set products in cart to local storage
    CartService.getAllProductsInCartFromAPI(email, 'Bearer ' + token);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email');
    if (user !== null) return true;
    return false;
  }
  isUserLoggedInAsCust() {
    let userRole = sessionStorage.getItem('user_role');
    if (userRole === 'CUST') return true;
    return false;
  }
  isUserLoggedInAsLocalWare() {
    let user = sessionStorage.getItem('email');
    let userRole = sessionStorage.getItem('user_role');
    if (userRole === 'LOCALWARE' && user !== null) return true;
    return false;
  }
  isUserLoggedInAsCentWare() {
    let user = sessionStorage.getItem('email');
    let userRole = sessionStorage.getItem('user_role');
    if (userRole === 'CENTWARE' && user !== null) return true;
    return false;
  }
  isUserLoggedInAsSupplier() {
    let user = sessionStorage.getItem('email');
    let userRole = sessionStorage.getItem('user_role');
    if (userRole === 'SUPPLIER' && user !== null) return true;
    return false;
  }

  checkUserAuthentication(email, password) {
    return axios.post(`${API_SERVER_URL}/authenticate`, {
      username: email,
      password: password,
    });
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedInAsCust()) {
        config.headers = { Authorization: 'Bearer ' + token };
      }
      return config;
    });
  }
}

export default new AuthenticationService();
