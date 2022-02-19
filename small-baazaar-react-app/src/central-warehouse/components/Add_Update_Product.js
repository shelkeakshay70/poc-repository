import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ProductService from '../../customer/services/ProductService';

const Add_Update_Product = ({
  selectedProductId,
  setSelectedProductId,
  showAddUpdateModal,
  setShowAddUpdateModal,
  setShowAddStock,
}) => {
  const [productDetails, setProductDetails] = useState();
  const [productType, setProductType] = useState();
  const [productName, setProductName] = useState();
  const [unitQuantity, setUnitQuantity] = useState();
  const [unit, setUnit] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (selectedProductId !== undefined) {
      ProductService.getProductByProductId(selectedProductId)
        .then((res) => {
          setProductDetails(res.data);
          setProductType(res.data.productType);
          setProductName(res.data.productName);
          setUnitQuantity(res.data.quantity.toString());
          setUnit(res.data.unit);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const handleClose = () => {
    setShowAddUpdateModal(false);
    setSelectedProductId();
    setError();
    setProductType();
    setProductName();
    setUnitQuantity();
    setUnit();
    setShowAddStock(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let isValidated = true;
    if (
      productType === undefined ||
      productName === undefined ||
      unitQuantity === undefined ||
      unit === undefined ||
      productType === '' ||
      productName === '' ||
      unitQuantity === '' ||
      unit === ''
    ) {
      isValidated = false;
      setError('All Fields are mandatory');
    } else if (!unitQuantity.match(/^[0-9]*\.?[0-9]*$/)) {
      isValidated = false;
      setError('Unit can be numbers only');
    }
    if (isValidated) {
      if (selectedProductId === undefined)
        ProductService.addNewProduct(
          productName,
          unitQuantity,
          unit,
          productType
        );
      else
        ProductService.updateProduct(
          selectedProductId,
          productName,
          unitQuantity,
          unit,
          productType
        );
      handleClose();
      //window.location.reload();
    }
  };

  return (
    <div>
      <Modal animation={false} show={showAddUpdateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            {productDetails ? (
              <Modal.Title>Update Existing product</Modal.Title>
            ) : (
              <Modal.Title>Add New product</Modal.Title>
            )}
          </div>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-warning">{error}</div>}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Product Type:
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={(e) => {
                setProductType(e.target.value);
                setError();
              }}
            >
              {productDetails ? (
                <option value={productDetails.productType}>
                  {productDetails.productType}
                </option>
              ) : (
                <option>Choose</option>
              )}
              <option value="FARM">FARM</option>
              <option value="DAIRY">DAIRY</option>
            </select>
          </div>
          <div>
            <div className="input-group-prepend">
              <label className="input-group-text">Product Name: </label>
              {productDetails ? (
                <input
                  type="text"
                  className="form-control"
                  defaultValue={productDetails.productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    setError();
                  }}
                ></input>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setProductName(e.target.value);
                    setError();
                  }}
                ></input>
              )}
            </div>
            <br></br>
            <div className="input-group-prepend">
              <label className="input-group-text">Unit: </label>
              {productDetails ? (
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setUnitQuantity(e.target.value);
                    setError();
                  }}
                  defaultValue={productDetails.quantity}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setUnitQuantity(e.target.value);
                    setError();
                  }}
                />
              )}
              <select
                className="custom-select"
                id="inputGroupSelect02"
                onChange={(e) => {
                  setUnit(e.target.value);
                  setError();
                }}
              >
                {productDetails ? (
                  <option value={productDetails.unit}>
                    {productDetails.unit}
                  </option>
                ) : (
                  <option>Choose...</option>
                )}

                <option value="KG">KG</option>
                <option defaultValue="LITER">LITER</option>
                <option value="PIECE">PIECE</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-blue-grey btn-sm" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-blue btn-sm" onClick={handleSave}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
      )
    </div>
  );
};
export default Add_Update_Product;
