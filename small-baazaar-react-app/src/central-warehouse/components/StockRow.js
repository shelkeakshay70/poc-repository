import { useState, useEffect } from 'react';
import StockService from '../../customer/services/StockService';

const StockRow = ({ stock }) => {
  const [updateClicked, setUpdateClicked] = useState(false);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    setPrice(stock.unitPrice);
    setQuantity(stock.quantity);
  }, []);
  const updateClickHandle = (e) => {
    e.preventDefault();
    setUpdateClicked(true);
  };
  const saveClickHandle = (e) => {
    e.preventDefault();
    let isValidated = true;
    if (
      quantity === undefined ||
      price === undefined ||
      quantity === '' ||
      price === ''
    ) {
      setError('All fields are mandatory !');
      isValidated = false;
    } else if (
      !quantity.toString().match(/^[0-9]*$/) ||
      !price.toString().match(/^[0-9]*\.?[0-9]*$/)
    ) {
      isValidated = false;
      setError('Price & Quantity should be numbers');
    }
    if (isValidated) {
      StockService.updateStock(
        stock.stockId,
        stock.product.productId,
        stock.user.id,
        stock.brand,
        quantity,
        price
      );
      setUpdateClicked(false);
    }
  };
  const deleteClickHandle = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        `Delete selected stock for product: ${stock.product.productName} ?`
      )
    ) {
      StockService.deleteStockByStockId(stock.stockId)
        .then((res) => alert(res.data + '\nRefresh page ones.'))
        .catch((err) => console.log(err));
      //window.location.reload();
    }
  };
  return (
    <tr key={stock.stockId}>
      <td>{stock.stockId}</td>
      <td>
        {stock.product.productName}, {stock.product.quantity}
        {stock.product.unit}
        {error && <div className="alert alert-warning">{error}</div>}
      </td>
      <td>{stock.brand}</td>
      <td>{stock.user.name}</td>
      <td>
        {updateClicked ? (
          <input
            type="text"
            id="price"
            defaultValue={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setError();
            }}
          ></input>
        ) : (
          price
        )}
      </td>
      <td>
        {updateClicked ? (
          <input
            type="text"
            id="quantity"
            defaultValue={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setError();
            }}
          ></input>
        ) : (
          quantity
        )}
      </td>
      <td>
        {!updateClicked && (
          <button className="btn btn-amber btn-sm" onClick={updateClickHandle}>
            Update
          </button>
        )}
        {updateClicked && (
          <button className="btn btn-success btn-sm" onClick={saveClickHandle}>
            Save
          </button>
        )}
        <button className="btn btn-danger btn-sm" onClick={deleteClickHandle}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default StockRow;
