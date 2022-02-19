import logo from '../../images/logo.PNG';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartService from '../services/CartService';
import { useState } from 'react';
import Addresses from './Addresses';
import ProductAtCheckout from './ProductAtCheckout';
import { Container } from 'react-bootstrap';
import PaymentService from '../services/PaymentService';
const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [productsInCart, setProductsInCart] = useState();
  const [oneOrMoreProUnavailable, setOneOrMoreProUnavailable] = useState(false);
  const history = useHistory();
  useEffect(() => {
    //add all cart products to DB after login
    // let allProducts = CartService.getAllProductsInCart();
    // allProducts &&
    //   allProducts.map((product) => {
    //     CartService.addProductsToCartDB(
    //       product,
    //       product.stock.stockId,
    //       CartService.getProductQuantityInCart(product.productId)
    //     );
    //   });

    CartService.getAllProductsForCheckout()
      .then((res) => {
        setProductsInCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTotal = () => {
    let total = 0;
    for (var i = 0; i < productsInCart.length; i++) {
      total +=
        productsInCart[i].productQuantity * productsInCart[i].stock.unitPrice;
    }
    return total.toFixed(2);
  };

  const ProceedToPayClickHandle = (e) => {
    e.preventDefault();
    history.push('/payments');
    // PaymentService.proceedWithPayments();
  };
  return (
    <div>
      <div className="popover-header">
        <img src={logo} alt="brand_logo"></img>
      </div>
      <label>Select Your delivery address: </label>
      <Addresses setSelectedAddress={setSelectedAddress} />
      {selectedAddress && (
        <div>
          Selected Address is: {selectedAddress.streetAddress},
          {selectedAddress.locality}, {selectedAddress.city},
          {selectedAddress.pincode}
        </div>
      )}
      <br></br>
      <div>
        <h5 className="font-weight-bolder">List of Products:</h5>
      </div>
      {productsInCart && selectedAddress && (
        <Container>
          {productsInCart.map((cartProduct) => (
            <ProductAtCheckout
              key={cartProduct.cartProductId}
              cartProduct={cartProduct}
              selectedAddress={selectedAddress}
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
              setOneOrMoreProUnavailable={setOneOrMoreProUnavailable}
            />
          ))}
        </Container>
      )}
      {productsInCart && (
        <div>
          {productsInCart.length > 0 ? (
            <div className="container">
              <label className="font-weight-bold">
                Total: {calculateTotal()}{' '}
              </label>
              <button
                className="btn btn-success"
                onClick={ProceedToPayClickHandle}
                disabled={oneOrMoreProUnavailable}
              >
                Proceed To Pay
              </button>
            </div>
          ) : (
            <div>You have nothing to buy in cart</div>
          )}
        </div>
      )}
    </div>
  );
};
export default Checkout;
