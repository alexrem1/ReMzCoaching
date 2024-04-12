import { Link } from "react-router-dom";
import logo from "../Icons/ReMzCoachingLogo.png";
import { X } from "lucide-react";

function AdminNavbar({
  closeHamburger,
  windowWidth,
  setShowText,
  showText,
  handleLogout,
}) {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <img className="logo-img" src={logo} alt="" />
      </Link>
      {windowWidth <= 767.5 && !showText ? (
        <svg
          className="hamburger"
          onClick={() => setShowText(!showText)}
          viewBox="0 0 24 24"
          style={{
            fill: "none",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            style={{
              stroke: "var(--clr-cta)",
              strokeWidth: "2",
              strokeLinecap: "round",
            }}
          />
          <path
            d="M4 12L20 12"
            style={{
              stroke: "var(--clr-cta)",
              strokeWidth: "2",
              strokeLinecap: "round",
            }}
          />
          <path
            d="M4 6L20 6"
            style={{
              stroke: "var(--clr-cta)",
              strokeWidth: "2",
              strokeLinecap: "round",
            }}
          />
        </svg>
      ) : windowWidth <= 767.5 && showText ? (
        <>
          <X className="hamburger" onClick={() => setShowText(!showText)} />
          <div className="overlay" onClick={closeHamburger}>
            <div className="hamburger-menu">
              <Link to="/admin">
                <p>Dashboard</p>
              </Link>
              <Link>
                <p onClick={handleLogout}>Logout</p>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="hamburger-menu">
          <Link to="/admin">
            <p>Dashboard</p>
          </Link>
          <Link>
            <p onClick={handleLogout}>Logout</p>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
