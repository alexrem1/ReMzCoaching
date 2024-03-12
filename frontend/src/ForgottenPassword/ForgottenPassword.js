import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from "react";

function ForgottenPassword() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const schema = yup.object().shape({
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Your email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;
  const onSubmit = async (data) => {
    await axios
      .post(`${whichAPI}/forgot-password`, data)
      .then((res) => {
        if (res.data.Status === "Successfully requested password reset") {
          console.log(res, data);
          // navigate("/reset-password");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }
  }, []);
  return (
    <>
      <h1>Forgotten Password</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} ref={inputRef}>
        <br />
        <input type="text" placeholder="Email..." {...register("Email")} />
        {errors.Email && <p>{errors.Email.message}</p>}

        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <p>Submitting...</p>
          ) : isSubmitSuccessful ? (
            <p>Password reset sent</p>
          ) : (
            <p>Reset Password</p>
          )}
        </button>
        {isSubmitSuccessful && (
          <p>
            Please check your inbox and junk folders for our password reset
            instructions
          </p>
        )}
        <br />
        {errors.root && <p>{errors.root.message}</p>}
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default ForgottenPassword;
