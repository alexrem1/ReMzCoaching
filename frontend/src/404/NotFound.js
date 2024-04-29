import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="primary-cta"
          style={{ marginTop: "1.5rem" }}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
