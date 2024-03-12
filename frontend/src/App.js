import Navbar from "./Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SchoolServices from "./Services/SchoolServices";
import Home from "./Home/Home";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import { useIsAuthenticated } from "./Context/AuthContext";
import { Loader } from "lucide-react";
import ProfileUpdate from "./Profile/ProfileUpdate";
import Bookings from "./Bookings/Bookings";
import ForgottenPassword from "./ForgottenPassword/ForgottenPassword";
import ResetPassword from "./ForgottenPassword/ResetPassword";
import StripeTest from "./Bookings/StripeTest";
import FormHolder from "./AA/FormHolder";
import TEST from "./AA/TEST";
import SuccessPayment from "./AA/SuccessPayment";

function App() {
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stripe" element={<FormHolder />} />
        <Route path="/test" element={<StripeTest />} />
        <Route path="/payment/:id" element={<TEST />} />
        <Route path="/success/:id" element={<SuccessPayment />} />
        <Route
          path="/bookings"
          element={
            loading === null ? (
              <div className="loading">
                <Loader />
              </div>
            ) : !loading && auth ? (
              <Bookings />
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
            loading === null ? null : loading && !auth ? (
              <Login />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            loading === null ? null : loading && !auth ? (
              <ForgottenPassword />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reset-password/:id/:token"
          element={
            loading === null ? null : loading && !auth ? (
              <ResetPassword />
            ) : (
              !loading && auth && <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            loading === null ? null : !loading && auth ? (
              <Profile />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/update/:id"
          element={
            loading === null ? null : !loading && auth ? (
              <ProfileUpdate />
            ) : (
              loading && !auth && <Navigate to="/login" />
            )
          }
        />
        <Route path="/services" element={<SchoolServices />} />
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
          path="*"
          element={<p>this doesn't exist - build a 401 page</p>}
        />
      </Routes>
    </Router>
  );
}

export default App;
