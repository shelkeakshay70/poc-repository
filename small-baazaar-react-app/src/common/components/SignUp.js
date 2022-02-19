import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignUpService from '../services/SignUpService';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();
  // var sectionStyle = {
  //   backgroundImage: `url(${Background})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;
    if (!name.match(/^[a-zA-Z ]*$/)) {
      isFormValid = false;
      alert(' Name should contain only letters');
      setName('');
    }

    let lastAtPos = email.lastIndexOf('@');
    let lastDotPos = email.lastIndexOf('.');

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf('@@') === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      isFormValid = false;
      alert('Enter valid email');
      setEmail('');
    }

    if (password !== confirmPassword) {
      isFormValid = false;
      alert('Passwords are not matching');
      setConfirmPassword('');
    }
    if (isFormValid) {
      const role = event.target.selectRole.value;
      SignUpService.checkIfEmailExists(email)
        .then((response) => {
          if (response.data === 'User found') {
            setUserExists(true);
          } else {
            setUserExists(false);
            SignUpService.signUpWithNewUser(name, email, role, password)
              .then((response) => {
                alert('Registration successful');
                history.push('/login');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    // <section style={sectionStyle}>
    <section>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <form className="was-validated" onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              {userExists && (
                <div className="alert alert-warning">
                  User is already exists, please try login
                </div>
              )}
              <hr></hr>
              <div className="form-group">
                <label className="font-weight-bold">Your name</label>
                <input
                  type="text"
                  id="name"
                  maxLength="40"
                  placeholder="Enter name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Your email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  maxLength="50"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* <label className="font-weight-bold">Your Phone</label>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                id="phoneNo"
                maxLength="13"
                className="form-control"
                required
              />
              <br />
              <label className="font-weight-bold">Your Address</label>

              <input
                type="text"
                id="yourAddress"
                maxLength="100"
                placeholder="Enter Address"
                className="form-control"
                required
              />
              <br />
              <div className="input-group-prepend">
                <input
                  type="text"
                  id="city"
                  maxLength="100"
                  placeholder="Enter City"
                  className="form-control"
                  required
                />

                <input
                  type="text"
                  id="city"
                  maxLength="100"
                  placeholder="Enter Locality"
                  className="form-control"
                  required
                />
              </div>
              <br /> */}
              <div className="form-group">
                <label className="font-weight-bold">Select your Role</label>
                <select id="selectRole" className="form-control">
                  <option value="Customer">Customer</option>
                  <option value="Local Warehouse">Local Warehouse</option>
                  <option value="Central Warehouse">Central Warehouse</option>
                  <option value="Supplier">Supplier</option>
                </select>
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Choose password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  maxLength="20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  maxLength="20"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button className="btn btn-success" type="submit">
                  Register
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
