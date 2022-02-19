import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CheckoutSerive from '../services/CheckoutSerive';
import CartService from '../services/CartService';
import DifferentBuyingOptions from './DifferentBuyingOptions';
import StockService from '../services/StockService';

const ProductAtCheckout = ({
  cartProduct,
  selectedAddress,
  productsInCart,
  setProductsInCart,
  setOneOrMoreProUnavailable,
}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isDeliverable, setIsDeliverable] = useState(true);
  const [serverResponse, setServerResponse] = useState();
  const [showModal, setShowModal] = useState(false);
  const [productStockDetails, setProductStockDetails] = useState();
  useEffect(() => {
    setOneOrMoreProUnavailable(false);
    CheckoutSerive.checkProductAvailability(
      selectedAddress.pincode,
      cartProduct.stock.stockId,
      cartProduct.productQuantity
    )
      .then((res) => {
        setServerResponse(res.data);
        if (res.data === 'Available') setIsAvailable(true);
        else if (res.data.includes('Not Deliverible')) {
          setIsDeliverable(false);
          setIsAvailable(false);
          setOneOrMoreProUnavailable(true);
        } else {
          setIsAvailable(false);
          setIsDeliverable(true);
          setOneOrMoreProUnavailable(true);
        }
      })
      .catch((err) => console.log(err));

    StockService.getStockDetailsByProduct(cartProduct.product.productId)
      .then((response) => {
        setProductStockDetails(response.data);
      })
      .catch((err) => console.log(err));
  }, [selectedAddress, productsInCart]);

  const deleteClickHandle = (e) => {
    e.preventDefault();
    CartService.removeProductsFromCartDB(
      cartProduct.product,
      cartProduct.stock.stockId,
      0
    );
    CartService.removeFromCartOnLocalStorage(cartProduct.product, 0);
    setProductsInCart(
      productsInCart.filter(
        (p1) => p1.cartProductId !== cartProduct.cartProductId
      )
    );
  };
  return (
    <>
      <Row>
        <Col xs={5}>
          {cartProduct.product.productName} [Brand: {cartProduct.stock.brand},
          Supplier:
          {cartProduct.stock.user.name}]: {'   ' + cartProduct.productQuantity}*
          {cartProduct.product.quantity}
          {cartProduct.product.unit}
        </Col>
        <Col xs={1}>
          Rs
          {(cartProduct.stock.unitPrice * cartProduct.productQuantity).toFixed(
            2
          )}
        </Col>
        {isAvailable ? (
          <Col xs={3} className="text-success" xs={3}>
            {serverResponse}
          </Col>
        ) : (
          <Col xs={3} className="text-danger" xs={3}>
            {serverResponse}
          </Col>
        )}

        <Col>
          {isDeliverable && !isAvailable && (
            <button
              className="btn btn-lime btn-sm"
              onClick={() => setShowModal(true)}
            >
              Different Options
            </button>
          )}
        </Col>

        <Col xs={1}>
          <button className="btn btn-danger btn-sm" onClick={deleteClickHandle}>
            X
          </button>
        </Col>
      </Row>
      <hr></hr>
      {showModal && (
        <DifferentBuyingOptions
          cartProduct={cartProduct}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedAddress={selectedAddress}
          productStockDetails={productStockDetails}
        />
      )}
    </>
  );
};

export default ProductAtCheckout;
