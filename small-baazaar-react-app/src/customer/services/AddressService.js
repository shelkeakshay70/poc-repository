import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';

class AddressService {
  getAllAddressOfUser() {
    let user_id = sessionStorage.getItem('user_id');
    let token = sessionStorage.getItem('token');
    return axios.get(`${API_SERVER_URL}/address/${user_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  updateAddress(
    addressId,
    addressTitle,
    streetAddress,
    locality,
    city,
    pincode
  ) {
    let token = sessionStorage.getItem('token');
    let user_id = sessionStorage.getItem('user_id');
    axios
      .put(
        `${API_SERVER_URL}/address`,
        {
          addressId: addressId,
          addressTitle: addressTitle,
          streetAddress: streetAddress,
          locality: locality,
          city: city,
          pincode: pincode,
          user: {
            id: user_id,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((response) => {
        console.log(response);
      });
  }

  addNewAddress(addressTitle, streetAddress, locality, city, pincode) {
    let token = sessionStorage.getItem('token');
    let user_id = sessionStorage.getItem('user_id');
    axios
      .post(
        `${API_SERVER_URL}/address`,
        {
          addressTitle: addressTitle,
          streetAddress: streetAddress,
          locality: locality,
          city: city,
          pincode: pincode,
          user: {
            id: user_id,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((response) => {
        console.log(response);
      });
  }
}
export default new AddressService();
