import { Link } from 'react-router-dom';
import logo from '../../images/logo.PNG';
import { useState, useEffect } from 'react';
import AddressService from '../../customer/services/AddressService';

const Customer_Orders = () => {
  const [address, setAddress] = useState();
  useEffect(() => {
    AddressService.getAllAddressOfUser()
      .then((res) => setAddress(res.data[0]))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {address && (
        <div>
          <div className="popover-header">
            <img className="img-fluid" src={logo} alt=""></img>
          </div>
          <div>
            <h1 className="font-weight-bolder">
              Local WareHouse Management Portal
            </h1>
            <h4 className="font-italic">
              Locality: {address.locality}, Pin Code: {address.pincode}
            </h4>
          </div>
          <div>
            <Link to="/manage-local-stocks">Manage Local Stocks</Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Customer_Orders;
