import React from "react";
import "./NotFound.css";

const NotFoundProduct = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>Oops! This service doesn't exist</h1>
        <p>The service you are looking for does not exist.</p>
        <button
          onClick={() => {
            window.location.href = "/products";
          }}
          className="primary-cta"
          style={{ marginTop: "1.5rem" }}
        >
          Go to Services
        </button>
      </div>
    </div>
  );
};

export default NotFoundProduct;
