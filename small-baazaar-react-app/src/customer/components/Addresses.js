import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import AddressService from '../services/AddressService';
import { useState } from 'react';
import Edit_AddNew_Address from './Edit_AddNew_Address';
import AuthenticationService from '../../common/services/AuthenticationService';

const Addresses = ({ setSelectedAddress, fromProfile }) => {
  const [addresses, setAddresses] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [addressToEditOrUpdate, setAddressToEditOrUpdate] = useState();
  const [isCustomerUser, setIsCustomerUser] = useState(false);
  useEffect(() => {
    setIsCustomerUser(AuthenticationService.isUserLoggedInAsCust());

    AddressService.getAllAddressOfUser()
      .then((response) => {
        setAddresses(response.data);
        if (!fromProfile && AuthenticationService.isUserLoggedInAsCust()) {
          setSelectedAddress(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addNewAddressHandler = (event) => {
    event.preventDefault();
    setAddressToEditOrUpdate({
      addressId: 0,
      addressTitle: '',
      streetAddress: '',
      locality: '',
      city: '',
      pincode: null,
    });
    setShowModel(true);
  };

  function editClickHandle(event, address) {
    event.preventDefault();
    setAddressToEditOrUpdate(address);
    setShowModel(true);
  }
  return (
    <div>
      {isCustomerUser ? (
        <h5 className="font-weight-bolder">Delivery Addresses: </h5>
      ) : (
        <h5 className="font-weight-bolder">Your Address: </h5>
      )}
      {addresses ? (
        <Container>
          <div className="card-deck">
            {addresses.map((address) => (
              <div className="card" key={address.addressId}>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2">{address.addressTitle}</h6>
                  <p className="card-text">
                    {address.streetAddress}, {address.locality}, {address.city},
                    {address.pincode}
                  </p>
                  <div className="btn-group">
                    {!fromProfile && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedAddress(address);
                        }}
                        className="btn btn-success btn-sm"
                      >
                        Select
                      </button>
                    )}
                    <button
                      className="btn btn-cyan btn-sm"
                      onClick={(e) => editClickHandle(e, address)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showModel && (
            <Edit_AddNew_Address
              showModel={showModel}
              setShowModel={setShowModel}
              address={addressToEditOrUpdate}
              addresses={addresses}
              setAddresses={setAddresses}
            />
          )}
        </Container>
      ) : (
        <div>You don't have any address added</div>
      )}
      {(isCustomerUser || addresses.length < 1) && (
        <button
          className="btn btn-yellow btn-sm"
          onClick={addNewAddressHandler}
        >
          Add New Address
        </button>
      )}
    </div>
  );
};
export default Addresses;
