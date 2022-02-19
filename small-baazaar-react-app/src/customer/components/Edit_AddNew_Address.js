import React from 'react';
import Modal from 'react-modal';
import shortid from 'shortid';
import AddressService from '../services/AddressService';

const Edit_AddNew_Address = ({
  showModel,
  setShowModel,
  address,
  addresses,
  setAddresses,
}) => {
  Modal.setAppElement('#root');

  function closeModal() {
    setShowModel(false);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let addressTitle = event.target.address_title.value;
    let streetAddress = event.target.street_address.value;
    let locality = event.target.locality.value;
    let city = event.target.city.value;
    let pincode = event.target.pincode.value;
    if (address.addressId === 0) {
      setAddresses([
        ...addresses,
        {
          addressId: shortid.generate(),
          addressTitle: addressTitle,
          streetAddress: streetAddress,
          locality: locality,
          city: city,
          pincode: pincode,
        },
      ]);
      AddressService.addNewAddress(
        addressTitle,
        streetAddress,
        locality,
        city,
        pincode
      );
      window.location.reload();
    } else {
      setAddresses(
        addresses.map((addr) => {
          if (addr.addressId === address.addressId) {
            return {
              addressId: address.addressId,
              addressTitle: addressTitle,
              streetAddress: streetAddress,
              locality: locality,
              city: city,
              pincode: pincode,
            };
          }
          return addr;
        })
      );
      AddressService.updateAddress(
        address.addressId,
        addressTitle,
        streetAddress,
        locality,
        city,
        pincode
      );
    }
    setShowModel(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal isOpen={showModel} style={customStyles} onRequestClose={closeModal}>
      <form onSubmit={submitHandler}>
        <div>
          <p className="form-group">
            Address title:
            <input
              id="address_title"
              type="text"
              className="form-control"
              placeholder="Home, Friend's place, Office, etc."
              defaultValue={address.addressTitle}
            />
          </p>
          <p className="form-group">
            Street Address:
            <input
              id="street_address"
              type="text"
              className="form-control"
              defaultValue={address.streetAddress}
            />
          </p>
          <p className="form-group">
            Locality:
            <input
              id="locality"
              className="form-control"
              type="text"
              defaultValue={address.locality}
            />
          </p>
          <p className="form-group">
            City:
            <input
              id="city"
              className="form-control"
              type="text"
              defaultValue={address.city}
            />
          </p>
          <p className="form-group">
            Pincode:
            <input
              className="form-control"
              id="pincode"
              type="text"
              defaultValue={address.pincode}
            />
          </p>
        </div>
        <div>
          <div className="btn-group-sm">
            <input className="btn btn-success btn-sm" type="submit"></input>
            <button className="btn btn-danger btn-sm" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Edit_AddNew_Address;
