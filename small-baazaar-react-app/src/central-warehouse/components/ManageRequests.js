import logo from '../../images/logo.PNG';
import { Link } from 'react-router-dom';
const ManageRequests = () => {
  return (
    <div>
      <div className="popover-header">
        <img className="img-fluid" src={logo} alt=""></img>
      </div>
      <div>
        <h1 className="font-weight-bolder">
          Central WareHouse Management Portal
        </h1>
      </div>
      <Link to="/manage-stocks">Manage Stocks</Link>
    </div>
  );
};
export default ManageRequests;
