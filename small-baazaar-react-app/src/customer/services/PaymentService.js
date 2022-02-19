import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';

class AddressService {
  proceedWithPayments() {
    let user_id = sessionStorage.getItem('user_id');
    let token = sessionStorage.getItem('token');
    axios
      .post(
        `${API_SERVER_URL}/submitPaymentDetail`,
        null,

        {
          params: {
            CUST_ID: '2333',
            TXN_AMOUNT: '2.00',
            ORDER_ID: 56574,
          },
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
export default new AddressService();
