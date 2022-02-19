import { useEffect, useState } from 'react';
import CartService from '../services/CartService';
import { Container, Row, Col } from 'react-bootstrap';

const OrderSuccessful = () => {
  const [orderId, setOrderId] = useState();
  const [productsInCart, setProductsInCart] = useState();
  useEffect(() => {
    setOrderId(new Date().getTime());
    CartService.getAllProductsForCheckout()
      .then((res) => {
        setProductsInCart(res.data);
        CartService.removeAllProductsFromCart();
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

  return (
    <div>
      <h2 className="text-success">Order Successfully Placed</h2>
      <div>Order Id:{orderId} </div>
      <hr></hr>
      <div>Purchase information:</div>
      <div>
        {productsInCart && (
          <Container>
            {productsInCart.map((cartProduct) => (
              <Row>
                <Col>
                  {cartProduct.product.productName} [Brand:{' '}
                  {cartProduct.stock.brand}, Supplier:
                  {cartProduct.stock.user.name}]:{' '}
                  {'   ' + cartProduct.productQuantity}*
                  {cartProduct.product.quantity}
                  {cartProduct.product.unit}
                </Col>
                <Col>
                  Rs
                  {(
                    cartProduct.stock.unitPrice * cartProduct.productQuantity
                  ).toFixed(2)}
                </Col>
              </Row>
            ))}
          </Container>
        )}
        {productsInCart && <div>Payment Done: Rs. {calculateTotal()}</div>}
      </div>
    </div>
  );
};

export default OrderSuccessful;
