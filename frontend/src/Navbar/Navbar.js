import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "../Context/AuthContext";
import "./Navbar.css";
import AdminNavbar from "../Admin/AdminNavbar";
import useLogout from "../CustomHooks/useLogout";
import logo from "../Images/apple-touch-icon.png";

function Navbar() {
  const [showText, setShowText] = useState(false);

  function closeHamburger() {
    setShowText(false);
  }

  const { auth, role } = useIsAuthenticated();

  const { handleLogout } = useLogout();

  return auth && role === "admin" ? (
    <AdminNavbar />
  ) : (
    <nav className="navbar">
      <Link to="/" onClick={() => closeHamburger()}>
        <img className="logo-img" src={logo} alt="" />
      </Link>
      {!showText ? (
        <svg
          className="hamburger"
          onClick={() => {
            setShowText(!showText);
          }}
          viewBox="0 0 24 24"
          style={{
            fill: "none",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            style={{
              stroke: "#000000",
              strokeWidth: "2",
              strokeLinecap: "round",
            }}
          />
          <path
            d="M4 12L20 12"
            style={{
              stroke: "#000000",
              strokeWidth: "2",
              strokeLinecap: "round",
            }}
          />
          <path
            d="M4 6L20 6"
            style={{
              stroke: "#000000",
              strokeWidth: "2",
              strokeLinecap: "round",
            }}
          />
        </svg>
      ) : (
        <svg
          className="hamburger"
          onClick={() => {
            setShowText(!showText);
          }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 26 26"
        >
          <g>
            <path
              style={{ fill: "#030104" }}
              d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25   C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0   L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467   L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468   c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467   C19.033,16.725,19.033,17.138,18.78,17.394z"
            />
          </g>
        </svg>
      )}

      {showText && (
        <div className="hamburger-menu">
          <Link to="/">
            <p onClick={() => closeHamburger()}>Home</p>
          </Link>
          <Link to="/services">
            <p onClick={() => closeHamburger()}>School Services</p>
          </Link>
          <Link to="/test">
            <p onClick={() => closeHamburger()}>bookings</p>
          </Link>
          <Link to="/about-us">
            <p onClick={() => closeHamburger()}>about us</p>
          </Link>
          <Link to="/contact-us">
            <p onClick={() => closeHamburger()}>contact us</p>
          </Link>

          {auth ? (
            <>
              <Link to="/profile">
                <p onClick={() => closeHamburger()}>My Account</p>
              </Link>
              <Link>
                <p onClick={handleLogout}>Logout</p>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <p onClick={() => closeHamburger()}>Login</p>
              </Link>
              <Link to="/register">
                <p onClick={() => closeHamburger()}>Register</p>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;