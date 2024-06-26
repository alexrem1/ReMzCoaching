import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
// import CAPTCHA from "./CAPTCHA";
import "./CheckoutForm.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { id } = useParams();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const whichURL =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_URL;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${whichURL}/success/${id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      // console.log(error);
    } else {
      setMessage("An unexpected error occurred.");
      // console.log(error, message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      {stripe && elements && (
        <form id="payment-form" onSubmit={handleSubmit}>
          <AddressElement
            options={{
              mode: "shipping",
              fields: {
                phone: "always",
              },
              defaultValues: {
                country: "GB",
              },
              validation: {
                phone: {
                  required: "always",
                },
              },
            }}
          />
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button
            disabled={isLoading || !stripe || !elements}
            className={"primary-cta"}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner">
                  Loading...
                </div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          <p>
            Use the card number 4242 4242 4242 4242 to simulate a test card, use
            any expiry date in the future and use any cvc to proceed with
            payment.
          </p>
          {/* <CAPTCHA /> */}
          {/* Show any error or success messages */}
          {message && (
            <div className="error" id="payment-message">
              {message}
            </div>
          )}
        </form>
      )}
    </>
  );
}
