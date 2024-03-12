import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SuccessPayment() {
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );
  console.log(payment_intent);

  const status = new URLSearchParams(window.location.search).get(
    "redirect_status"
  );

  const { id } = useParams();

  console.log(id);

  const navigate = useNavigate();

  useEffect(() => {
    const isSuccessful = async () => {
      const whichAPI =
        window.location.hostname === "localhost"
          ? process.env.REACT_APP_API_URL
          : process.env.REACT_APP_VURL;
      try {
        await axios.post(`${whichAPI}/orders/${id}`, { payment_intent });
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    };
    isSuccessful();
  }, []);
  return (
    <div>
      {status === "succeeded" && (
        <>SuccessPayment, you will be redirected shortly...</>
      )}
    </div>
  );
}

export default SuccessPayment;
