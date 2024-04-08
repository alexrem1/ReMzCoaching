import React from "react";
import "./aboutMe.css"; // Import CSS for styling

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="hero-section">
        <h1>Meet the founder</h1>
        <p className="hero-text">
          Passionate about football since childhood, our founder brings a wealth
          of experience and expertise to coaching the next generation of
          players.
        </p>
      </div>
      <div className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">{/* Insert About Me content here */}</div>
          <div className="about-image">
            {/* Placeholder for your image */}
            <img src="#" alt="Your Image" />
          </div>
        </div>
      </div>
      <div className="business-section">
        <h2>Business Information</h2>
        <div className="business-content">
          {/* Insert Business Information content here */}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
