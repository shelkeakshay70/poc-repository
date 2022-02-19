import './App.css';
import Header from './common/components/Header';
import Home from './customer/components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DairyProducts from './customer/components/DairyProducts';
import FarmProducts from './customer/components/FarmProducts';
import Error from './common/components/error-components/Error';
import Login from './common/components/Login';
import Logout from './common/components/Logout';
import AuthenticatedRouteForCust from './common/components/AuthenticatedRouteForCust';
import SignUp from './common/components/SignUp';
import CartDetails from './customer/components/CartDetails';
import Checkout from './customer/components/Checkout';
import Profile from './customer/components/Profile';
import ManageRequests from './central-warehouse/components/ManageRequests';
import AuthenticatedRouteForCentWare from './central-warehouse/components/AuthenticatedRouteForCentWare';
import ManageStocks from './central-warehouse/components/ManageStocks';
import AuthenticatedRoute from './common/components/AuthenticatedRoute';
import AuthenticatedRouteForLocalWare from './local-warehouse/components/AuthenticatedRouteForLocalWare';
import LocalStocks from './local-warehouse/components/LocalStocks';
import Customer_Orders from './local-warehouse/components/Customer_Orders';
import OrderSuccessful from './customer/components/OrderSuccessful';
import Payments from './customer/components/Payments';
import OrderFail from './customer/components/OrderFail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <AuthenticatedRouteForCentWare
            path="/manage-requests"
            component={ManageRequests}
          />
          <AuthenticatedRouteForCentWare
            path="/manage-stocks"
            component={ManageStocks}
          />
          <AuthenticatedRouteForLocalWare
            path="/customer-orders"
            component={Customer_Orders}
          />
          <AuthenticatedRouteForLocalWare
            path="/manage-local-stocks"
            component={LocalStocks}
          />
          <Route path="/dairy-products" component={DairyProducts} />
          <Route path="/farm-products" component={FarmProducts} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={SignUp} />
          <Route path="/cart-details" component={CartDetails} />
          <AuthenticatedRouteForCust path="/checkout" component={Checkout} />
          <AuthenticatedRouteForCust path="/payments" component={Payments} />
          <AuthenticatedRouteForCust
            path="/order-success"
            component={OrderSuccessful}
          />
          <AuthenticatedRouteForCust path="/order-fail" component={OrderFail} />
          <AuthenticatedRoute path="/profile" component={Profile} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
