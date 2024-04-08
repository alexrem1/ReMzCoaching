import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "../../Context/AuthContext";
import "./Navbar.css";
import AdminNavbar from "../../Admin/AdminNavbar";
import useLogout from "../../CustomHooks/useLogout";
import logo from "../../Images/apple-touch-icon.png";
import { X } from "lucide-react";

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
        <X
          className="hamburger"
          onClick={() => {
            setShowText(!showText);
          }}
        />
      )}

      {showText && (
        <div className="hamburger-menu">
          <Link to="/">
            <p onClick={() => closeHamburger()}>Home</p>
          </Link>

          <Link to="/products">
            <p onClick={() => closeHamburger()}>Services</p>
          </Link>
          <Link to="/about-us">
            <p onClick={() => closeHamburger()}>about us</p>
          </Link>
          <Link to="/contact-us">
            <p onClick={() => closeHamburger()}>Contact us</p>
          </Link>

          {auth ? (
            <>
              <Link to="/profile">
                <p onClick={() => closeHamburger()}>Account</p>
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
