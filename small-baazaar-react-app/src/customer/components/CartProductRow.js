import CartService from '../services/CartService';
import { useState, useEffect } from 'react';
import AuthenticationService from '../../common/services/AuthenticationService';

const CartProductRow = ({
  product,
  cartDetails,
  setCartDetails,
  setPlusMinusClicked,
}) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [selectedStock, setSelectedStock] = useState();
  useEffect(() => {
    let quantity = CartService.getProductQuantityInCart(product.productId);
    setProductQuantity(quantity ? parseInt(quantity) : 0);

    if (quantity > 0) {
      const allProductsInCart = CartService.getAllProductsInCart();
      allProductsInCart.map((pro) => {
        if (parseInt(pro.productId) === product.productId) {
          setSelectedStock(pro.stock);
        }
      });
    }
  }, []);

  const handleClickPlus = (e) => {
    e.preventDefault();

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
    setPlusMinusClicked(productQuantity + 1);
  };

  const handleClickMinus = (e) => {
    e.preventDefault();
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
        setCartDetails(
          cartDetails.filter((p1) => p1.productId !== product.productId)
        );
      }
    }
    setPlusMinusClicked(productQuantity - 1);
  };
  return (
    <tr>
      <td className="font-weight-bolder">
        {product.productName}, {product.quantity}
        {product.unit} <br></br> [Brand: {product.stock.brand}, Supplier:{' '}
        {product.stock.user.name}]
      </td>
      <td className="font-weight-bolder">Rs. {product.stock.unitPrice}</td>
      <td>
        <div className="btn-group-sm">
          <button className="btn btn-red btn-sm" onClick={handleClickMinus}>
            -
          </button>
          <label className="text-center font-weight-bolder">
            {productQuantity}
          </label>
          <button
            className="btn btn-light-green btn-sm"
            onClick={handleClickPlus}
          >
            +
          </button>
        </div>
      </td>
      <td className="font-weight-bolder">
        Rs. {(productQuantity * product.stock.unitPrice).toFixed(2)}
      </td>
    </tr>
  );
};
export default CartProductRow;
