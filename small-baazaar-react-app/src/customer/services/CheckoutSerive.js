import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';
class CheckoutService {
  checkProductAvailability(pincode, stockId, quantity) {
    const token = sessionStorage.getItem('token');
    return axios.get(
      `${API_SERVER_URL}/local-stocks/availabilty/${pincode}/${stockId}/${quantity}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getAllFarmProducts() {
    return axios.get(`${API_SERVER_URL}/products/farm-products`);
  }

  getAllDairyProducts() {
    return axios.get(`${API_SERVER_URL}/products/dairy-products`);
  }

  getAllProducts() {
    const token = sessionStorage.getItem('token');
    return axios.get(`${API_SERVER_URL}/products/`, {
      headers: {
        Authorization: token,
      },
    });
  }

  getProductByProductId(productId) {
    const token = sessionStorage.getItem('token');
    return axios.get(`${API_SERVER_URL}/products/${productId}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  updateProduct(productId, productName, unitQuantity, unit, productType) {
    const token = sessionStorage.getItem('token');
    axios.put(
      `${API_SERVER_URL}/products`,
      {
        productId: productId,
        productName: productName,
        quantity: parseInt(unitQuantity),
        unit: unit,
        productType: productType,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  addNewProduct(productName, unitQuantity, unit, productType) {
    const token = sessionStorage.getItem('token');
    axios.post(
      `${API_SERVER_URL}/products`,
      {
        productName: productName,
        quantity: parseInt(unitQuantity),
        unit: unit,
        productType: productType,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  deleteProductByProductId(productId) {
    const token = sessionStorage.getItem('token');
    return axios.delete(`${API_SERVER_URL}/products/${productId}`, {
      headers: { Authorization: token },
    });
  }
}

export default new CheckoutService();
