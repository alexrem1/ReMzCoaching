import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBKEY);

function TEST() {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [productChosen, setProductChosen] = useState("");

  useEffect(() => {
    const whichAPI =
      window.location.hostname === "localhost"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_VURL;

    const makeRequest = async () => {
      const response = await axios.post(
        `${whichAPI}/create-payment-intent/${id}`
      );

      console.log(response);

      // Handle the response properly
      if (response.status === 200) {
        console.log(response);
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
        setProductChosen(response.data.product);
        // console.log(response.data.product);
      } else {
        console.error("Failed to create payment intent");
      }
    };
    makeRequest();
  }, [id]);

  //   // Check if clientSecret is null
  //   if (!clientSecret) {
  //     return (
  //       <div>
  //         <h1>Error</h1>
  //         <p>Client secret not found in location state.</p>
  //       </div>
  //     );
  //   }

  //   console.log(clientSecret, productChosen);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {productChosen && (
        <>
          <h1>Payment</h1>
          <h2>Product Details:</h2>
          <p>School: {productChosen.product_school}</p>
          <p>Activity: {productChosen.product_activity}</p>
          <p>
            Price: £
            {productChosen.product_price *
              productChosen.product_activity_duration}
          </p>
          <p>Occurrence: {productChosen.product_activity_duration}</p>
          <p>Duration: {productChosen.product_time}</p>

          {/* Payment form */}
          {clientSecret && (
            <>
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TEST;
