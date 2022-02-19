import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';
class LocalStockService {
  getStockByCentralStockId(centralWarehouseStockId) {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('user_id');
    return axios.get(
      `${API_SERVER_URL}/local-stocks/${userId}/${centralWarehouseStockId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  updateLocalStock(
    localWareStockId,
    centralWareStockId,
    currentQuantity,
    reorderLevel,
    maximumLevel
  ) {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('user_id');
    axios
      .put(
        `${API_SERVER_URL}/local-stocks`,

        {
          localWareStockId: localWareStockId,
          stock: {
            stockId: centralWareStockId,
          },
          currentQuantity: currentQuantity,
          reorderLevelQuantity: reorderLevel,
          maximumLevelQuantity: maximumLevel,
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((err) => console.log(err));
  }
}
export default new LocalStockService();
