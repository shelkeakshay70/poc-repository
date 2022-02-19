import CartService from '../services/CartService';
import { useState, useEffect } from 'react';
import AuthenticationService from '../../common/services/AuthenticationService';
import { MEDIA_SERVER_URL } from '../../common/constants/Constants';
import SelectProduct from './SelectProduct';
import StockService from '../services/StockService';

const ProductTile = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [productStockDetails, setProductStockDetails] = useState([]);
  const [selectedStock, setSelectedStock] = useState();
  const [showSelectProductModal, setShowSelectProductModal] = useState(false);
  const [showButtonGroup, setShowButtonGroup] = useState(false);
  const [defaultPrice, setDefaultPrice] = useState(0);

  useEffect(() => {
    let quantity = localStorage.getItem(product.productId);
    setProductQuantity(quantity ? parseInt(quantity) : 0);

    StockService.getStockDetailsByProduct(product.productId)
      .then((response) => {
        setProductStockDetails(response.data);
        setDefaultPrice(response.data[0].unitPrice);
      })
      .catch((error) => {
        console.log(error);
      });

    if (quantity > 0) {
      setShowButtonGroup(true);
      const allProductsInCart = CartService.getAllProductsInCart();
      allProductsInCart.map((pro) => {
        if (parseInt(pro.productId) === product.productId) {
          setSelectedStock(pro.stock);
        }
      });
    }
  }, []);

  const handleAddTocartClick = (e) => {
    e.preventDefault();
    setShowSelectProductModal(true);
  };

  const handleClickPlus = (event) => {
    event.preventDefault();

    setProductQuantity(productQuantity + 1);
    CartService.addToCartOnLocalStorage(
      product,
      selectedStock,
      productQuantity + 1
    );

    if (AuthenticationService.isUserLoggedInAsCust()) {
      CartService.addProductsToCartDB(
        product,
        selectedStock.stockId,
        productQuantity + 1
      );
    }
  };

  const handleClickMinus = (event) => {
    event.preventDefault();
    if (productQuantity !== 0) {
      setProductQuantity(productQuantity - 1);
      CartService.removeFromCartOnLocalStorage(product, productQuantity - 1);
      if (AuthenticationService.isUserLoggedInAsCust()) {
        CartService.removeProductsFromCartDB(
          product,
          selectedStock.stockId,
          productQuantity - 1
        );
      }
      if (productQuantity - 1 === 0) {
        setShowButtonGroup(false);
      }
    }
  };

  // const handleBuyNowClick = (event) => {
  //   event.preventDefault();

  //   if (AuthenticationService.isUserLoggedInAsCust()) {
  //     let quantity = 0;
  //     if (productQuantity === 0) {
  //       quantity = 1;
  //     } else {
  //       quantity = productQuantity;
  //     }
  //     CartService.addToCartOnLocalStorage(product, quantity);
  //     CartService.addProductsToCartDB(product, quantity);
  //   }
  //   history.push('/checkout');
  // };
  return (
    <>
      {productStockDetails && (
        <div className="container">
          <h4 className="text-center">{product.productName}</h4>
          <img
            className="product-image card-img"
            src={MEDIA_SERVER_URL + product.productImage}
            alt="product_image"
          />
          {selectedStock ? (
            <span className="text-info">{selectedStock.unitPrice} Rs </span>
          ) : (
            <span className="text-info">{defaultPrice} Rs </span>
          )}
          <span className="text-info">
            per {product.quantity} {product.unit}
          </span>
          <br></br>

          {!showButtonGroup ? (
            <div>
              <button
                className="btn btn-amber btn-sm"
                onClick={handleAddTocartClick}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="btn-group-sm">
              <button className="btn btn-red btn-sm" onClick={handleClickMinus}>
                -
              </button>
              <input
                className="textbox-quantity btn btn-sm"
                value={productQuantity}
                disabled
                type="text"
              ></input>
              <button
                className="btn btn-light-green btn-sm"
                onClick={handleClickPlus}
              >
                +
              </button>
            </div>
          )}

          {/*<div>
        <button className="btn btn-amber btn-sm" onClick={handleBuyNowClick}>
          Buy Now
        </button> 
      </div>*/}
          {/* {showSelectProductModal && ( */}
          <SelectProduct
            showModal={showSelectProductModal}
            setShowModal={setShowSelectProductModal}
            setShowButtonGroup={setShowButtonGroup}
            productStockDetails={productStockDetails}
            setProductStockDetails={setProductStockDetails}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
          />
          {/* )} */}
          <br></br>
        </div>
      )}
    </>
  );
};

export default ProductTile;
