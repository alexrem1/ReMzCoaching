import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBKEY);

export default function FormHolder() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const whichAPI =
      window.location.hostname === "localhost"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_VURL;
    // Create PaymentIntent as soon as the page loads
    axios
      .post(`${whichAPI}/create-payment-intent`, {
        items: [{ id: "xl-tshirt" }],
      })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </>
      )}
    </div>
  );
}
