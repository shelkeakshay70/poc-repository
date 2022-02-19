import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';
class UserService {
  getLoggedInUserDetails() {
    const token = sessionStorage.getItem('token');
    const user_id = sessionStorage.getItem('user_id');
    return axios.get(`${API_SERVER_URL}/user-details/id/${user_id}`, {
      headers: { Authorization: token },
    });
  }

  updateUserDetails(name, email, phone, password) {
    const token = sessionStorage.getItem('token');
    const user_id = sessionStorage.getItem('user_id');
    axios.put(
      `${API_SERVER_URL}/users/update`,
      {
        id: user_id,
        name: name,
        email: email,
        phone: phone,
        password: password,
      },
      {
        headers: { Authorization: token },
      }
    );
  }

  getAllSuppliers() {
    const token = sessionStorage.getItem('token');
    return axios.get(`${API_SERVER_URL}/users/suppliers`, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new UserService();
