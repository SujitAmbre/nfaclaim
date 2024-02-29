import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Resetpassword from './components/Resetpassword';
import ProductTypeList from './components/ProductTypeList';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import ManufacturerList from './components/ManufacturerList';
import RetailerList from './components/RetailerList';
import CreateClaim from './components/CreateClaim';
import EditClaim from './components/EditClaim';
import InstallationTypeList from './components/InstallationTypeList';
import LocationList from './components/LocationList';
import UserProfile from './components/UserProfile';
import AddSalseRep from './components/AddSalseRep';
import EditSalesRep from './components/EditSalesRep';
import axios from 'axios';
import SalesrepList from './components/SalesrepList';
import 'react-tooltip/dist/react-tooltip.css';
import ForgotPassword from './components/ForgotPassword';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  },
   {
    path: "/resetpassword",
    element: <Resetpassword />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/product-type/list",
    element: <ProductTypeList />
  },
  {
    path: "/manufacturers/list",
    element: <ManufacturerList />
  },
  {
    path: "/retailers/list",
    element: <RetailerList />
  },
  {
    path: "/installation-type/list",
    element: <InstallationTypeList />
  },
  {
    path: "/create-claim",
    element: <CreateClaim />
  },
  {
    path: "/edit-claim/:claim_id",
    element: <EditClaim />
  },
  {
    path: "/location/list",
    element: <LocationList />
  },
  {
    path: "/sales-rep/list",
    element: <SalesrepList />
  },
  {
    path: "/edit-sales-rep/:salesrep_id",
    element: <EditSalesRep />
  },
  {
    path: "/profile",
    element: <UserProfile />
  },
  {
    path: "/addSalesRep",
    element: <AddSalseRep />
  },

]);

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
    
  );
}

export default App;
