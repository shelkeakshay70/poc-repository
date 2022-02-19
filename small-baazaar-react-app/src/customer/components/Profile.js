import { useState, useEffect } from 'react';
import Addresses from './Addresses';
import UserService from '../../common/services/UserService';
import bcrypt from 'bcryptjs';

const Profile = () => {
  const [fromProfile] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    UserService.getLoggedInUserDetails()
      .then((response) => setUserDetails(response.data))
      .catch((err) => console.log(err));
  }, []);

  const updateClickeHandle = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    let password = null;
    let confirmPassword = null;
    if (showPasswordChange) {
      password = e.target.password.value;
      confirmPassword = e.target.confirm_password.value;
    }
    let isFormValid = true;
    if (!name.match(/^[a-zA-Z ]*$/)) {
      isFormValid = false;
      alert('Name should contain only letters');
    }
    if (!phone.match(/^[0-9]*$/)) {
      isFormValid = false;
      alert('Only numbers are allowed in phone number');
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
    }

    if (password !== confirmPassword) {
      isFormValid = false;
      alert('Passwords are not matching');
    }
    if (isFormValid) {
      if (showPasswordChange) password = bcrypt.hashSync(confirmPassword, 10);
      UserService.updateUserDetails(name, email, phone, password);
      alert('Update successful');
    }
  };
  return (
    <div>
      <h1>My Account</h1>
      <hr></hr>
      <div>
        Here you can update your account details, as well as can manage your
        addresses from here.
      </div>
      <hr></hr>
      <div className="container">
        <div>
          <h4>Personal/Contact Details:</h4>
          {userDetails && (
            <form className="was-validated" onSubmit={updateClickeHandle}>
              <div className="form-sm">
                Name:
                <input
                  type="text"
                  id="name"
                  defaultValue={userDetails.name}
                  required
                ></input>
                Email:
                <input
                  type="text"
                  id="email"
                  defaultValue={userDetails.email}
                  required
                ></input>
                Phone Number:
                <input
                  type="text"
                  defaultValue={userDetails.phone}
                  id="phone"
                  placeholder="Enter mobile number here"
                  required
                ></input>
                <div>
                  {!showPasswordChange ? (
                    <button
                      className="btn btn-grey btn-sm"
                      onClick={() => setShowPasswordChange(true)}
                    >
                      Change Password
                    </button>
                  ) : (
                    <div>
                      <hr></hr>
                      New Password:
                      <input type="password" id="password" required></input>
                      Confirm Password:
                      <input
                        type="password"
                        id="confirm_password"
                        required
                      ></input>
                    </div>
                  )}
                </div>
                <div>
                  <button type="submit" className="btn btn-yellow btn-sm">
                    Update
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        <hr></hr>
        <div>
          <Addresses fromProfile={fromProfile}></Addresses>
        </div>
      </div>
    </div>
  );
};
export default Profile;
