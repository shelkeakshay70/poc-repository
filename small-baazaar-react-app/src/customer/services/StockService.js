import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';
class StockService {
  getStockDetailsByProduct(productId) {
    return axios.get(`${API_SERVER_URL}/stocks/productId/${productId}`);
  }

  getStockByStockId(stockId) {
    return axios.get(`${API_SERVER_URL}/stocks/${stockId}`);
  }

  getAllStocks() {
    const token = sessionStorage.getItem('token');
    return axios.get(`${API_SERVER_URL}/stocks`, {
      headers: {
        Authorization: token,
      },
    });
  }

  addNewStock(productId, supplierId, brand, quantity, price) {
    const token = sessionStorage.getItem('token');
    axios
      .post(
        `${API_SERVER_URL}/stocks`,
        {
          product: {
            productId: productId,
          },
          user: {
            id: supplierId,
          },
          brand: brand,
          quantity: quantity,
          unitPrice: price,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((err) => console.log(err));
  }

  deleteStockByStockId(stockId) {
    const token = sessionStorage.getItem('token');
    return axios.delete(`${API_SERVER_URL}/stocks/${stockId}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  updateStock(stockId, productId, supplierId, brand, quantity, price) {
    const token = sessionStorage.getItem('token');
    axios
      .put(
        `${API_SERVER_URL}/stocks`,
        {
          stockId: stockId,
          product: {
            productId: productId,
          },
          user: {
            id: supplierId,
          },
          brand: brand,
          quantity: quantity,
          unitPrice: price,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((err) => console.log(err));
  }
  //   getMax(arr, prop) {
  //     var max;
  //     for (var i = 0; i < arr.length; i++) {
  //       if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
  //         max = arr[i];
  //     }
  //     return max;
  //   }
  //   getMin(arr, prop) {
  //     //const arr = JSON.parse(stocks);
  //     var min;
  //     for (var i = 0; i < arr.length; i++) {
  //       console.log(arr[i]);
  //       if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
  //         min = arr[i];
  //     }
  //     return min;
  //   }
}
export default new StockService();
