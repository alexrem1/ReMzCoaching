import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";

function SuccessPayment() {
  // Get the current date and time
  const currentDateTime = dayjs();

  // Format the date and time as YYYY-MM-DD HH:mm:ss, which is the format expected by SQL DATETIME or TIMESTAMP columns
  const formattedDateTime = currentDateTime.format("DD/MM/YYYY HH:mm:ss");

  const [status, setStatus] = useState(null);
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );
  // console.log(payment_intent);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const isSuccessful = async () => {
      const whichAPI =
        window.location.hostname === "localhost"
          ? process.env.REACT_APP_API_URL
          : process.env.REACT_APP_VURL;
      try {
        const response = await axios.put(`${whichAPI}/orders/${id}`, {
          payment_intent,
          formattedDateTime,
        });
        setStatus(response.data.paymentIntent.status);
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
        console.log(response);
      } catch (error) {
        setStatus(error.response.data.error);
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      }
    };
    isSuccessful();
  }, []);
  return (
    <div className="form-container" style={{ height: "50vh" }}>
      {status === "succeeded" ? (
        <div className="form-container-form">
          <div className="content">
            <p>
              Your order has been placed, please check your junk for an email
              from us for more details.
            </p>
            <p>You will be redirected to your profile shortly...</p>
          </div>
        </div>
      ) : (
        <div className="form-container-form">
          <div className="content">
            <p className="error">{status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default SuccessPayment;
