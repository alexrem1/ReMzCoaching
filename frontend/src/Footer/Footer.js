import "./footer.css";
import logo from "../Icons/ReMzCoachingLogo.png";
import { Briefcase, Calendar, Mail, PhoneCall } from "lucide-react";
import useUtilities from "../CustomHooks/useUtilities";

export default function Footer() {
  const { navigate } = useUtilities();

  const sendEmail = () => {
    const email = "wickzy123@hotmail.com";
    window.open(`mailto:${email}`);
  };

  const makePhoneCall = () => {
    window.open(`tel:${+447534633664}`);
  };

  return (
    <div className="footer">
      <div className="img-container">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </div>
      <div className="contact-links">
        <div className="contact">
          <div className="mail" onClick={sendEmail}>
            <Mail /> <p>Make enquiry</p>
          </div>
          <div className="phone" onClick={makePhoneCall}>
            <PhoneCall /> <p>07534633664</p>
          </div>
          <div className="calendar">
            <Calendar /> <p>Mon-Fri 9am - 5pm</p>
          </div>
        </div>
        <div className="links">
          <p
            onClick={() => {
              navigate("/");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Home
          </p>
          <p
            onClick={() => {
              navigate("/products");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Services
          </p>
          <p
            onClick={() => {
              navigate("/about-us");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            About us
          </p>
        </div>
      </div>
      <div className="social">
        <Briefcase
          onClick={() => {
            window.location.href =
              "https://alexrem1.github.io/SASS-Project/dist/index.html";
          }}
        />
        <i
          className="fab fa-github"
          onClick={() => {
            window.location.href = "https://github.com/alexrem1";
          }}
        ></i>
        <i
          className="fab fa-linkedin"
          onClick={() => {
            window.location.href = "https://www.linkedin.com/in/acr123/";
          }}
        ></i>
      </div>
    </div>
  );
}
