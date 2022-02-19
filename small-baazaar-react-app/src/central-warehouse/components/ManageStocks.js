import { useEffect } from 'react';
import StockService from '../../customer/services/StockService';
import { useState } from 'react';
import StockRow from './StockRow';
import AddStock from './AddStock';

const ManageStocks = () => {
  const [stockDetails, setStockDetails] = useState();
  const [showAddStock, setShowAddStock] = useState(false);
  useEffect(() => {
    StockService.getAllStocks()
      .then((res) => setStockDetails(res.data))
      .catch((err) => console.log(err));
  }, [showAddStock]);
  return (
    <div>
      <div>
        <h1>Stock Management</h1>
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
                <th>QUANTITY</th>
                <th>
                  <button
                    className="btn btn-green btn-sm"
                    onClick={() => setShowAddStock(true)}
                  >
                    New Stock
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {stockDetails.map((stock) => (
                <StockRow key={stock.stockId} stock={stock} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showAddStock && (
        <AddStock
          showAddStock={showAddStock}
          setShowAddStock={setShowAddStock}
        />
      )}
    </div>
  );
};

export default ManageStocks;
