import { Container, Row, Col, Modal } from 'react-bootstrap';

const SelectProduct = ({
  showModal,
  setShowModal,
  setShowButtonGroup,
  productStockDetails,
  setProductStockDetails,
  selectedStock,
  setSelectedStock,
}) => {
  let i = 1;
  function closeModal() {
    setShowModal(false);
  }
  function selectHandler(e, stock) {
    e.preventDefault();
    setSelectedStock(stock);
    setShowModal(false);
    setShowButtonGroup(true);
  }

  return (
    <Modal animation={false} show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Brand and Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <Col sm={3}>
                <button
                  className="btn btn-success btn-sm"
                  onClick={(e) => selectHandler(e, stock)}
                >
                  Select
                </button>
              </Col>
            </Row>
          ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>@SmallBaazaar</Modal.Footer>
    </Modal>
  );
};
export default SelectProduct;
