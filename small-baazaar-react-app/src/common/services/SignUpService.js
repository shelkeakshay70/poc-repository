import axios from 'axios';
import bcrypt from 'bcryptjs';
import { API_SERVER_URL } from '../constants/Constants';

class SignUpService {
  signUpWithNewUser(name, email, role, password) {
    let passwordHash = bcrypt.hashSync(password, 10);
    return axios.post(`${API_SERVER_URL}/users/add`, {
      name: name,
      email: email,
      userRole: role,
      password: passwordHash,
    });
  }
  checkIfEmailExists(email) {
    return axios.get(`${API_SERVER_URL}/users/${email}`);
  }
}
export default new SignUpService();
