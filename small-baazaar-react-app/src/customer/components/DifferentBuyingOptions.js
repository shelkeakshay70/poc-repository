import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import StockService from '../services/StockService';
import CheckoutSerive from '../services/CheckoutSerive';

const DifferentBuyingOptions = ({
  cartProduct,
  showModal,
  setShowModal,
  selectedAddress,
}) => {
  const [productStockDetails, setProductStockDetails] = useState();
  const [availability, setAvailability] = useState();

  useEffect(() => {
    StockService.getStockDetailsByProduct(cartProduct.product.productId)
      .then((response) => {
        setProductStockDetails(response.data);
        response.data.map((stock) => {
          CheckoutSerive.checkProductAvailability(
            selectedAddress.pincode,
            stock.stockId,
            cartProduct.productQuantity
          )
            .then((res) => {
              if (res.data === 'Available') {
                setAvailability(res.data);
                setProductStockDetails(
                  response.data.map((s) => {
                    if (s.stockId === stock.stockId) {
                      return {
                        stockId: stock.stockId,
                        product: stock.product,
                        user: stock.user,
                        brand: stock.brand,
                        quantity: stock.quantity,
                        unitPrice: stock.unitPrice,
                        isAvailableAtLocalWare: true,
                      };
                    }
                    return s;
                  })
                );
                // setProductStockDetails([
                //   ...stock,
                //   {
                //     isAvailableAtLocalWare: true,
                //   },
                // ]);
              } else {
                setProductStockDetails(
                  response.data.map((s) => {
                    if (s.stockId === stock.stockId) {
                      return {
                        stockId: stock.stockId,
                        product: stock.product,
                        user: stock.user,
                        brand: stock.brand,
                        quantity: stock.quantity,
                        unitPrice: stock.unitPrice,
                        isAvailableAtLocalWare: false,
                      };
                    }
                    return s;
                  })
                );
              }
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, []);
  let i = 1;

  function closeModal() {
    setShowModal(false);
  }
  function selectHandler(e, stock) {
    e.preventDefault();
    setShowModal(false);
  }

  return (
    <Modal animation={false} show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Brand and Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {availability && productStockDetails && (
          <Container>
            {productStockDetails.map((stock) => (
              <Row key={stock.stockId}>
                <Col sm={9}>
                  <label className="font-weight-bold">{i++} .</label>
                  <label className="font-weight-bold"> Supplier: </label>
                  {stock.user.name},{' '}
                  <label className="font-weight-bold">Brand: </label>
                  {stock.brand},{' '}
                  <label className="font-weight-bold">Price: </label>
                  {stock.unitPrice}
                </Col>
                {/* {checkAvailability(
                  stock.stockId,
                  stock.product,
                  stock.user,
                  stock.brand,
                  stock.quantity,
                  stock.unitPrice
                )} */}

                <Col sm={3}>
                  {stock.isAvailableAtLocalWare ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) => selectHandler(e, stock)}
                    >
                      Select
                    </button>
                  ) : (
                    <button className="btn btn-danger btn-sm" disabled>
                      Not Available
                    </button>
                  )}
                </Col>
              </Row>
            ))}
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>@SmallBaazaar</Modal.Footer>
    </Modal>
  );
};
export default DifferentBuyingOptions;
