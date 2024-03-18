import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SuccessPayment() {
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
        const response = await axios.post(`${whichAPI}/orders/${id}`, {
          payment_intent,
        });
        setStatus(response.data.paymentIntent.status);
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    isSuccessful();
  }, []);
  return (
    <>
      {status === "succeeded" && (
        <>
          <p>
            Your order has been placed, please check your junk for an email from
            us for more details.
          </p>
          <p>You will be redirected to your profile shortly...</p>
        </>
      )}
    </>
  );
}
export default SuccessPayment;
