import logo from './logo.svg';
import './App.css';
import HomeNav from './Components/HomeNav';
import Home from './pages/Home';
import About from './pages/About';
import { Link,Route,BrowserRouter, Routes } from 'react-router-dom';
import Contact from './pages/user/Contact';
import Packages from './pages/Packages';
import Register from './pages/Register';
import Login from './pages/Login';
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard';
import CoordinatorViewPackages from './pages/coordinator/CoordinatorViewPackages';
import CoordinatorAddPackage from './pages/coordinator/CoordinatorAddPackage';
import CoordinatorUpdatePackage from './pages/coordinator/CoordinatorUpdatePackage';
import Userdashboard from './pages/user/Userdashboard';
import UserPayPackages from './pages/user/userPayPackages/UserPayPackages';
import ResortRegister from './pages/Resort/ResortRegister';
import Resortdashboard from './pages/Resort/Resortdashboard';
import Resort from './pages/Resort/Resort';
import Admindashboard from './pages/admin/Admindashboard';
import Adminmanageuser from './pages/admin/Adminmanageuser';
import Adminmanageresort from './pages/admin/Adminmanageresort';
import Adminmanagecordinator from './pages/admin/Adminmanagecordinator';
import Updateresort from './pages/Resort/Updateresort';
import Useviewresort from './pages/user/Useviewresort';
import UserPayResort from './pages/user/UserPayResort';
import AdminViewPayment from './pages/admin/AdminViewPayment/AdminViewPayment';
import CoordinatorViewPayment from './pages/coordinator/ViewPayment/CoordinatorViewPayment';
import ViewPayment from './pages/Resort/ViewPayment';
import AdminViewFeedBack from './pages/admin/AdminViewFeedBack';
import ShowBookedPackage from './pages/user/ShowBookedPackage';
import ShowBookedResort from './pages/user/ShowBookedResort';
import CoordinatorRegister from './pages/coordinator/CoordinatorRegister';
import ManageCoordinator from './pages/Resort/ManageCoordinator';
import UserBookInternational from './pages/user/UserBookInternational';
import UserPayInternationalPackage from './pages/user/UserPayInternationalPackage';
import AdminViewResortBooking from './pages/admin/AdminViewResortBooking';
import AdminViewPackageBooking from './pages/admin/AdminViewPackageBooking';
import AdminViewPaymentResort from './pages/admin/AdminViewPayment/AdminViewPaymentResort';

function App() {
  return (<div>
    {/* <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt=""/>
                </div>
            </div>
        </div>
    </div> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/packages' element={<Packages/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/coordinatordashboard' element={<CoordinatorDashboard/>}/>
      <Route path='/coordinatorpackages' element={<CoordinatorViewPackages/>}/>
      <Route path='/coordinatoraddpackage' element={<CoordinatorAddPackage/>}/>
      <Route path='/coordinatorupdatepackage/:id' element={<CoordinatorUpdatePackage/>}/>
      <Route path='/userdashboard' element={<Userdashboard/>}/>
      <Route path='/userpaypackages/:id/:price/:c_id/:num/:category_id' element={<UserPayPackages/>}/>
      <Route path='/resortRegister' element={<ResortRegister/>}/>
      <Route path='/resortDashboard' element={<Resortdashboard/>}/>
      <Route path='/updateresort/:id' element={<Updateresort/>}/>
      <Route path='/resorts' element={<Resort/>}/>
      <Route path='/admindashboard' element={<Admindashboard/>}/>
      <Route path='/adminmanageuser' element={<Adminmanageuser/>}/>
      <Route path='/adminmanageresort' element={<Adminmanageresort/>}/>
      <Route path='/adminmanagecordinator' element={<Adminmanagecordinator/>}/>
      <Route path='/userviewresort' element={<Useviewresort/>}/>
      <Route path='/userpayresort' element={<UserPayResort/>}/>
      <Route path='/userShowBookedPackage' element={<ShowBookedPackage/>}/>
      <Route path='/userShowBookedResort' element={<ShowBookedResort/>}/>
      <Route path='/adminViewPayment' element={<AdminViewPayment/>}/>
      <Route path='/coordinatorveiwpayment' element={<CoordinatorViewPayment/>}/>
      <Route path='/resortViewPayment' element={<ViewPayment/>}/>
      <Route path='/adminViewFeedback' element={<AdminViewFeedBack/>}/>
      <Route path='/coordinatorRegister' element={<CoordinatorRegister/>}/>
      <Route path='/resortmanagecordinator' element={<ManageCoordinator/>}/>
      <Route path='/userbookiternational/:id/:price/:c_id/:category_id' element={<UserBookInternational/>}/>
      <Route path='/userpayinternationalpackage' element={<UserPayInternationalPackage/>}/>
      <Route path='/adminViewResortBooking' element={<AdminViewResortBooking/>}/>
      <Route path='/adminViewPackageBooking' element={<AdminViewPackageBooking/>}/>
      <Route path='/adminViewpaymentresort' element={<AdminViewPaymentResort/>}/>

    </Routes>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
