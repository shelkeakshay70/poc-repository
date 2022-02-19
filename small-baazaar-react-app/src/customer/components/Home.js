import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import imgFarmProducts from '../../images/farm-products.jpg';
import imgDairyProducts from '../../images/dairy-products.jpg';
import logo from '../../images/logo.PNG';

const Home = (props) => {
  return (
    <div>
      <div className="popover-header">
        <img className="img-fluid" src={logo} alt=""></img>
      </div>
      <br></br>
      <Container>
        <Row md={2}>
          <div>
            <Col>
              <h3 className="text-dark">Farm Fresh Products</h3>
              <Link to="/farm-products">
                <img
                  className="home-page-tiles-image card-img"
                  src={imgFarmProducts}
                  alt="Farm products"
                />
              </Link>
            </Col>
          </div>
          <div>
            <Col>
              <h3 className="text-dark"> Dairy Products</h3>
              <Link to="/dairy-products">
                <img
                  className="home-page-tiles-image card-img"
                  src={imgDairyProducts}
                  alt="Dairy products"
                />
              </Link>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
