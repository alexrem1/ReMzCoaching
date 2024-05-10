import Navbar from "./Components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home/Home";
import Registration from "./Authentication/Registration/Registration";
import Login from "./Authentication/Login/Login";
import Profile from "./MyAccount/Profile/Profile";
import Admin from "./Admin/Admin";
import { useIsAuthenticated } from "./Context/AuthContext";
import { Loader } from "lucide-react";
import ProfileUpdate from "./MyAccount/UserDetails/UserUpdateDetails";
import ForgottenPassword from "./Authentication/ForgottenPassword/ForgottenPassword";
import ResetPassword from "./Authentication/ResetPassword/ResetPassword";
import Payment from "./PaymentProcess/Stripe/Payment";
import SuccessPayment from "./PaymentProcess/Success/SuccessPayment";
import AdminUpdateProduct from "./Admin/AdminProducts/AdminUpdateProduct";
import AdminAddProduct from "./Admin/AdminProducts/AdminAddProduct";
import Products from "./Bookings/Products";
import AboutMe from "./AboutMe/AboutMe";
import Footer from "./Footer/Footer";
import NotFound from "./404/NotFound";
import NotFoundProduct from "./404/NotFoundProduct";
import axios from "axios";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  axios.defaults.withCredentials = true;
  const { auth, loading, role, userID } = useIsAuthenticated();
  if (loading === null) {
  }
  console.log(
    "from app.js",
    "auth: " + auth,
    "role: " + role,
    "loading: " + loading,
    "ID " + userID
  ); // Log the value of auth after it has been updated
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutMe />} />

        <Route
          path="/products"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth ? (
              <Products />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : loading && !auth ? (
              <Registration />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : loading && !auth ? (
              <Login />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : loading && !auth ? (
              <ForgottenPassword />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reset-password/:id/:token"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : loading && !auth ? (
              <ResetPassword />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth ? (
              <Profile />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/update/:id"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth ? (
              <ProfileUpdate />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth && role === "admin" ? (
              <Admin />
            ) : (
              role !== "admin" && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/product-update/:id"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth && role === "admin" ? (
              <AdminUpdateProduct />
            ) : (
              role !== "admin" && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/product-add"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth && role === "admin" ? (
              <AdminAddProduct />
            ) : (
              role !== "admin" && <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/payment/:id"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth ? (
              <Payment />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/success/:id"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth ? (
              <SuccessPayment />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/not-found-product" element={<NotFoundProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
