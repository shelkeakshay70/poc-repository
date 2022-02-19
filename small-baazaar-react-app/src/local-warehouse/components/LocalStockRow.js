import { useState, useEffect } from 'react';
import LocalStockService from '../services/LocalStockService';

const LocalStockRow = ({ stock }) => {
  const [localStockDetails, setLocalStockDetails] = useState();
  const [updateClicked, setUpdateClicked] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState();
  const [maximumLevelQuantity, setMaximumLevelQuantity] = useState();
  const [reorderLevelQuantity, setReorderLevelQuantity] = useState();
  const [error, setError] = useState();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  useEffect(() => {
    LocalStockService.getStockByCentralStockId(stock.stockId)
      .then((res) => {
        setLocalStockDetails(res.data);
        if (res.data.currentQuantity === undefined) setCurrentQuantity(0);
        else setCurrentQuantity(res.data.currentQuantity);
        if (res.data.maximumLevelQuantity === undefined)
          setMaximumLevelQuantity(0);
        else setMaximumLevelQuantity(res.data.maximumLevelQuantity);
        if (res.data.reorderLevelQuantity === undefined)
          setReorderLevelQuantity(0);
        else setReorderLevelQuantity(res.data.reorderLevelQuantity);
      })
      .catch((err) => console.log(err));
  }, [updateClicked]);
  const updateClickHandle = (e) => {
    e.preventDefault();
    setUpdateClicked(true);
    setSaveButtonDisabled(false);
  };
  const saveClickHandle = (e) => {
    e.preventDefault();
    let isValidated = true;
    if (
      currentQuantity === undefined ||
      reorderLevelQuantity === undefined ||
      maximumLevelQuantity === undefined ||
      currentQuantity === '' ||
      reorderLevelQuantity === '' ||
      maximumLevelQuantity === ''
    ) {
      setError('All fields are mandatory !');
      isValidated = false;
    } else if (
      !currentQuantity.toString().match(/^[0-9]*$/) ||
      !reorderLevelQuantity.toString().match(/^[0-9]*$/) ||
      !maximumLevelQuantity.toString().match(/^[0-9]*$/)
    ) {
      isValidated = false;
      setError('Only numbers allowed');
    }
    if (isValidated) {
      LocalStockService.updateLocalStock(
        localStockDetails.localWareStockId,
        stock.stockId,
        parseInt(currentQuantity),
        parseInt(reorderLevelQuantity),
        parseInt(maximumLevelQuantity)
      );
      setError('Stock updated! Click cancel.');
      //setUpdateClicked(false);
      setSaveButtonDisabled(true);
    }
  };

  const cancelClickHandle = (e) => {
    e.preventDefault();
    setUpdateClicked(false);
    setError();
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
      <td>{stock.unitPrice}</td>
      <td>
        {updateClicked ? (
          <input
            type="text"
            id="currentQuantity"
            defaultValue={currentQuantity}
            onChange={(e) => {
              setCurrentQuantity(e.target.value);
              setError();
            }}
          ></input>
        ) : (
          currentQuantity
        )}
      </td>
      <td>
        {updateClicked ? (
          <input
            type="text"
            id="reorderLevelQuantity"
            defaultValue={reorderLevelQuantity}
            onChange={(e) => {
              setReorderLevelQuantity(e.target.value);
              setError();
            }}
          ></input>
        ) : (
          reorderLevelQuantity
        )}
      </td>
      <td>
        {updateClicked ? (
          <input
            type="text"
            id="maximumLevelQuantity"
            defaultValue={maximumLevelQuantity}
            onChange={(e) => {
              setMaximumLevelQuantity(e.target.value);
              setError();
            }}
          ></input>
        ) : (
          maximumLevelQuantity
        )}
      </td>
      <td>
        {!updateClicked && (
          <button className="btn btn-amber btn-sm" onClick={updateClickHandle}>
            Update
          </button>
        )}
        {updateClicked && (
          <button
            className="btn btn-success btn-sm"
            onClick={saveClickHandle}
            disabled={saveButtonDisabled}
          >
            Save
          </button>
        )}
        {updateClicked && (
          <button className="btn btn-red btn-sm" onClick={cancelClickHandle}>
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};
export default LocalStockRow;
