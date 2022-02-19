import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductTile from './ProductTile';
import ProductService from '../services/ProductService';

const FarmProducts = (props) => {
  const [farmProducts, setFarmProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllFarmProducts()
      .then((response) => {
        setFarmProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {farmProducts.length > 0 && (
        <Container>
          <Row md={4}>
            {farmProducts.map((product) => (
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
      )}
    </div>
  );
};

export default FarmProducts;
