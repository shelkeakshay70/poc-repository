import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ProductService from '../../customer/services/ProductService';
import UserService from '../../common/services/UserService';
import StockService from '../../customer/services/StockService';
import Add_Update_Product from './Add_Update_Product';

const AddStock = ({ showAddStock, setShowAddStock }) => {
  const [products, setProducts] = useState();
  const [suppliers, setSuppliers] = useState();
  const [productId, setProductId] = useState();
  //below state is for passing product to update modal
  const [selectedProductToUpdate, setSelectedProductToUpdate] = useState();
  const [supplierId, setSupplierId] = useState();
  const [brand, setBrand] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState();
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);

  useEffect(() => {
    ProductService.getAllProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    UserService.getAllSuppliers()
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.log(err));
  }, [showAddStock]);

  const handleClose = () => {
    setShowUpdateDelete(true);
    setSupplierId();
    setBrand();
    setPrice();
    setQuantity();
    setProductId();
    setError();
    setShowAddStock(false);
  };

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        'Delete selected product ?\nAssociated stock will also get deleted.'
      )
    ) {
      ProductService.deleteProductByProductId(parseInt(productId))
        .then((res) => {
          alert('Product ' + productId + ' Deleted');
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setSelectedProductToUpdate(parseInt(productId));
    setShowAddUpdateModal(true);
    setShowUpdateDelete(true);
    setSupplierId();
    setBrand();
    setPrice();
    setQuantity();
    setProductId();
    setError();
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    setShowAddUpdateModal(true);
    setShowUpdateDelete(true);
    setSupplierId();
    setBrand();
    setPrice();
    setQuantity();
    setProductId();
    setError();
  };
  const selectProductChangeHandler = (e) => {
    setProductId(e.target.value);
    setError();
    if (e.target.value === null || e.target.value === '') {
      setShowUpdateDelete(true);
    } else setShowUpdateDelete(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    let isValidated = true;
    if (
      productId === undefined ||
      supplierId === undefined ||
      brand === undefined ||
      quantity === undefined ||
      price === undefined ||
      productId === '' ||
      supplierId === '' ||
      brand === '' ||
      quantity === '' ||
      price === ''
    ) {
      setError('All fields are mandatory !');
      isValidated = false;
    } else if (
      !quantity.match(/^[0-9]*$/) ||
      !price.match(/^[0-9]*\.?[0-9]*$/)
    ) {
      isValidated = false;
      setError('Price & Quantity should be numbers');
    }
    if (isValidated) {
      setError();
      StockService.addNewStock(
        parseInt(productId),
        parseInt(supplierId),
        brand,
        parseInt(quantity),
        parseFloat(price)
      );
      setShowAddStock(false);
      //window.location.reload();
      handleClose();
    }
  };

  return (
    <div>
      {products && suppliers && (
        <Modal animation={false} show={showAddStock} onHide={handleClose}>
          <Modal.Header closeButton>
            <div>
              <Modal.Title>Add New stock for a product</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-warning">{error}</div>}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Product:
                </label>
              </div>
              <select
                className="custom-select"
                id="inputGroupSelect01"
                onChange={selectProductChangeHandler}
              >
                <option></option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}, {product.quantity}
                    {product.unit}, {product.productType}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-weight-normal">
                Product not listed? Click below
              </label>
              <div>
                <button
                  className="btn btn-light-green btn-sm"
                  onClick={handleAddNewProduct}
                >
                  New Product
                </button>
                <button
                  className="btn btn-blue btn-sm"
                  disabled={showUpdateDelete}
                  onClick={handleUpdateProduct}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={showUpdateDelete}
                  onClick={handleDeleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
            <br></br>
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect02"
                  >
                    Supplier:
                  </label>
                </div>
                <select
                  className="custom-select"
                  id="inputGroupSelect02"
                  onChange={(e) => {
                    setSupplierId(e.target.value);
                    setError();
                  }}
                >
                  <option></option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}, {supplier.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group-prepend">
                <label className="input-group-text">Brand Name: </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setError();
                  }}
                ></input>
              </div>
              <br></br>
              <div className="input-group-prepend">
                <label className="input-group-text">Quantity: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter numbers only"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setError();
                  }}
                ></input>
              </div>
              <br></br>
              <div className="input-group-prepend">
                <label className="input-group-text">Price per unit:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter numbers only"
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError();
                  }}
                ></input>
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
      )}
      {showAddUpdateModal && (
        <Add_Update_Product
          selectedProductId={selectedProductToUpdate}
          setSelectedProductId={setSelectedProductToUpdate}
          showAddUpdateModal={showAddUpdateModal}
          setShowAddUpdateModal={setShowAddUpdateModal}
          setShowAddStock={setShowAddStock}
        />
      )}
    </div>
  );
};
export default AddStock;
