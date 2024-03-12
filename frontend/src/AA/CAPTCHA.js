import React, { useState, useEffect } from "react";

const CAPTCHA = () => {
  const [verified, setVerified] = useState(false);
  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const verifyCaptcha = async (token) => {
    const secret = process.env.REACT_APP_CAPTCHA_SECRET_KEY; // Replace 'YOUR_SECRET' with your actual hCaptcha secret key

    const response = await fetch(`${whichAPI}/verify-captcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        response: token,
        secret: secret,
      }),
    });

    console.log(response, "res");

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const captchaCallback = (token) => {
      verifyCaptcha(token)
        .then((data) => {
          console.log("Captcha verified:", data);
          setVerified(true); // Update state to indicate verification success
        })
        .catch((error) => {
          console.error("Error verifying captcha:", error);
          // Handle error
        });
    };

    // Initialize hCaptcha with your site key and specify the callback function
    window.hcaptcha.render("hcaptcha", {
      sitekey: process.env.REACT_APP_CAPTCHA_SITEKEY,
      callback: captchaCallback,
    });
  }, []);

  return (
    <div>
      {/* <div
        className="h-captcha"
        data-sitekey="cc906f21-8b94-4c63-befa-06102a6d189b"
      ></div> */}
      <div
        id="hcaptcha"
        className="h-captcha"
        data-sitekey={process.env.REACT_APP_CAPTCHA_SITEKEY}
      />
      {/* Add the hCaptcha widget */}
      {verified && <p>Captcha verified!</p>}
    </div>
  );
};

export default CAPTCHA;
