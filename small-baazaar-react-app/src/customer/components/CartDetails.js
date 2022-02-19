import { useState, useEffect } from 'react';
import CartService from '../services/CartService';
import { useHistory } from 'react-router-dom';
import CartProductRow from './CartProductRow';

const CartDetails = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [total, setTotal] = useState(0);
  //to call useEffect on basis of quantity updated
  const [plusMinusClicked, setPlusMinusClicked] = useState();
  const history = useHistory();
  useEffect(() => {
    let allProductsInCart = [];
    allProductsInCart = CartService.getAllProductsInCart();
    setCartDetails(allProductsInCart);

    if (allProductsInCart !== null) {
      let total = 0;
      for (var i = 0; i < allProductsInCart.length; i++) {
        total +=
          allProductsInCart[i].stock.unitPrice *
          CartService.getProductQuantityInCart(allProductsInCart[i].productId);
      }
      setTotal(total.toFixed(2));
    }
  }, [plusMinusClicked]);

  const handleEmptyCart = (event) => {
    event.preventDefault();
    CartService.removeAllProductsFromCart();
    window.location.reload();
  };
  const handleBuyNow = (event) => {
    event.preventDefault();
    history.push('/checkout');
  };
  const calculateTotal = () => {
    let total = 0;
    for (var i = 0; i < cartDetails.length; i++) {
      total +=
        cartDetails[i].stock.unitPrice *
        CartService.getProductQuantityInCart(cartDetails[i].productId);
    }
    return total.toFixed(2);
  };
  return (
    <div>
      {cartDetails ? (
        <div>
          <h1 className="h2 text-center mb-4">Cart Details</h1>
          <div className="container">
            <table className="table table-primary table-hover table-responsive-lg">
              <thead>
                <tr>
                  <th className="font-weight-bold">ITEM DESCRIPTION</th>
                  <th className="font-weight-bold">UNIT PRICE</th>
                  <th className="font-weight-bold">QUANTITY</th>
                  <th className="font-weight-bold">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.map((product) => (
                  <CartProductRow
                    key={product.productId}
                    product={product}
                    cartDetails={cartDetails}
                    setCartDetails={setCartDetails}
                    setPlusMinusClicked={setPlusMinusClicked}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <div>
            <h4 className="font-weight-bold">Total Rs. {total}</h4>
          </div>
          <button className="btn btn-danger" onClick={handleEmptyCart}>
            Empty Cart
          </button>
          {cartDetails.length !== 0 ? (
            <button onClick={handleBuyNow} className="btn btn-success">
              Buy Now
            </button>
          ) : null}
        </div>
      ) : (
        <div className="container">Cart is Empty</div>
      )}
    </div>
  );
};

export default CartDetails;
