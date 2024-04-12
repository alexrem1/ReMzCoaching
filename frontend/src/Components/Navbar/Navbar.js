import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "../../Context/AuthContext";
import "./Navbar.css";
import AdminNavbar from "../../Admin/AdminNavbar";
import useLogout from "../../CustomHooks/useLogout";
import logo from "../../Icons/ReMzCoachingLogo.png";
import { X } from "lucide-react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

function Navbar() {
  const [showText, setShowText] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function closeHamburger() {
    setShowText(false);
  }

  const { auth, role } = useIsAuthenticated();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return auth && role === "admin" ? (
    <AdminNavbar
      closeHamburger={closeHamburger}
      windowWidth={windowWidth}
      setShowText={setShowText}
      showText={showText}
      handleLogout={handleLogout}
    />
  ) : (
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
          <MobileNavbar
            closeHamburger={closeHamburger}
            auth={auth}
            handleLogout={handleLogout}
          />
        </>
      ) : (
        <DesktopNavbar auth={auth} handleLogout={handleLogout} />
      )}
    </nav>
  );
}

export default Navbar;
