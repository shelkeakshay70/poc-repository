import { useEffect } from 'react';
import StockService from '../../customer/services/StockService';
import { useState } from 'react';
import LocalStockRow from './LocalStockRow';

const LocalStocks = () => {
  const [stockDetails, setStockDetails] = useState();
  useEffect(() => {
    StockService.getAllStocks()
      .then((res) => setStockDetails(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div>
        <h1>Local Warehouse Stock Management</h1>
      </div>
      <div>
        {stockDetails && (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>STOCK ID</th>
                <th>PRODUCT</th>
                <th>BRAND</th>
                <th>SUPPLIER</th>
                <th>UNIT PRICE</th>
                <th>CURRENT QUANTITY</th>
                <th>REORDER LEVEL</th>
                <th>MAXIMUM LEVEL</th>
              </tr>
            </thead>
            <tbody>
              {stockDetails.map((stock) => (
                <LocalStockRow key={stock.stockId} stock={stock} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LocalStocks;
