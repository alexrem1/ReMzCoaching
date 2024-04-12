import React from "react";
import "./aboutMe.css"; // Import CSS for styling
import founder from "../Images/AboutMe/Screenshot 2024-04-11 175552.png";
import list1 from "../Images/AboutMe/list-1.jpg";
import padlock from "../Images/AboutMe/padlock.jpg";
import rainOrShine from "../Images/AboutMe/OMHWL20.jpg";
import kidsPlayingFootball from "../Images/AboutMe/kids-playing-football-supervised-by-football-trainer.jpg";
import useUtilities from "../CustomHooks/useUtilities";

const AboutMe = () => {
  const { navigate } = useUtilities();
  return (
    <div className="about-container">
      <div className="hero-section">
        <img src={founder} alt="" />

        <h1>Meet the founder</h1>
        <p className="hero-text">
          Passionate about football since childhood, our founder brings a wealth
          of experience and expertise to coaching the next generation of
          players.
        </p>
        <p className="hero-text two">
          At ReMz Coaching, we advocate for the importance of robust grassroots
          programs in all football-playing nations. We firmly believe that
          nurturing a love for the sport among young children is essential, as
          grassroots initiatives serve as the foundation for their passion and
          development. However, we recognize that parents often lack the
          necessary training and resources to effectively introduce football to
          their children during these crucial early stages, especially in
          environments with large groups and limited support.
        </p>
        <p className="hero-text">
          Our organization is uniquely positioned to address this gap. With our
          expertise and proven track record, we are equipped to support children
          of all abilities on their football journey. Our focus is not only on
          helping players reach their full potential but also on ensuring that
          they enjoy every step of the process. At ReMz Coaching, we are
          committed to empowering young athletes and fostering a lifelong love
          for the beautiful game.
        </p>
      </div>
      <div className="statement-section">
        <div className="hero-title">
          <p>We recruit the best young coaches in the country</p>
        </div>
      </div>
      <div className="reasons-section">
        <div className="reasons-content">
          <div className="reasons-list">
            <div className="list-img">
              <img src={list1} alt="" />
            </div>
            <div className="list-title">
              <h3>Qualified, energitic coaching</h3>
            </div>
            <div className="hero-text">
              <p>
                Our academy managers frequently hold FA Level 3 qualifications,
                while our younger coaches commonly possess Level 1 and 2
                certifications. Drawing from extensive playing experiences at
                high levels, our coaches undergo rigorous examinations
                administered by ReMz Coaching, fostering a coaching environment
                rich in creativity and imagination.
              </p>
            </div>
          </div>
          <div className="reasons-list">
            <div className="list-img">
              <img src={padlock} alt="" />
            </div>
            <div className="list-title">
              <h3>Safe & secure at all times</h3>
            </div>
            <div className="hero-text">
              <p>
                At ReMz Coaching, all our team members undergo a rigorous
                training program to guarantee that your children are in safe
                hands at all times. Prior to working with any children, every
                coach is required to possess a valid DBS check, ensuring the
                utmost safety and security standards.
              </p>
            </div>
          </div>
          <div className="reasons-list">
            <div className="list-img">
              <img src={rainOrShine} alt="" />
            </div>
            <div className="list-title">
              <h3>Great facilities - rain, hail or shine</h3>
            </div>
            <div className="hero-text">
              <p>
                We hold a deep sense of pride in the venues we select. The
                majority of these venues offer both indoor and outdoor
                facilities, ensuring uninterrupted training sessions even during
                the winter months.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="statement-section">
        <div className="hero-title">
          <p>Affordable prices</p>
        </div>
      </div>
      <div className="affordable-section">
        <div className="affordable-content">
          <div className="hero-statement">
            <p>
              At ReMz Coaching, we provide top-tier coaching at premier
              facilities without compromising affordability. Our dedication lies
              in nurturing every child to reach their full potential in
              football. We guarantee that every parent departs our sessions
              feeling they've received exceptional value for their investment.
            </p>
          </div>
          <div className="affordable-img">
            <img
              src={kidsPlayingFootball}
              alt=""
              width="455px"
              height="455px"
            />
          </div>
        </div>
      </div>

      <div className="statement-section">
        <div className="hero-title">
          <p>Join today! </p>
        </div>
      </div>
      <div className="reasons-section">
        <div className="reasons-content">
          <div className="reasons-list">
            <div className="list-title">
              <h3>Have a look at our services we provide</h3>
            </div>
            <div className="hero-text">
              <p>
                Our academy managers frequently hold FA Level 3 qualifications,
                while our younger coaches commonly possess Level 1 and 2
                certifications. Drawing from extensive playing experiences at
                high levels, our coaches undergo rigorous examinations
                administered by ReMz Coaching, fostering a coaching environment
                rich in creativity and imagination.
              </p>
            </div>
          </div>
          <div className="reasons-list">
            <div className="list-title">
              <h3>Safe & secure at all times</h3>
            </div>
            <div className="hero-text">
              <button
                className="primary-cta"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
              <p>
                At ReMz Coaching, all our team members undergo a rigorous
                training program to guarantee that your children are in safe
                hands at all times. Prior to working with any children, every
                coach is required to possess a valid DBS check, ensuring the
                utmost safety and security standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
