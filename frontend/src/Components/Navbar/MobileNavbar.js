import { Link } from "react-router-dom";

export default function MobileNavbar({ closeHamburger, handleLogout, auth }) {
  return (
    <div className="overlay" onClick={closeHamburger}>
      <div className="hamburger-menu">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/products">
          <p>Services</p>
        </Link>
        <Link to="/about-us">
          <p>About Us</p>
        </Link>
        <Link to="/contact-us">
          <p>Contact Us</p>
        </Link>
        {auth ? (
          <>
            <Link to="/profile">
              <p>My Account</p>
            </Link>
            <Link>
              <p onClick={handleLogout}>Logout</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <p>Login</p>
            </Link>
            <Link to="/register">
              <p>Register</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
