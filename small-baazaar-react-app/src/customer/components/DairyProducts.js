import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductTile from './ProductTile';
import ProductService from '../services/ProductService';

const DairyProducts = (props) => {
  const [dairyProducts, setDairyProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllDairyProducts()
      .then((response) => {
        setDairyProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row md={4}>
          {dairyProducts.map((product) => (
            <Col key={product.productId}>
              <ProductTile
                cartValue={props.cartValue}
                setCartValue={props.setCartValue}
                product={product}
              ></ProductTile>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DairyProducts;
