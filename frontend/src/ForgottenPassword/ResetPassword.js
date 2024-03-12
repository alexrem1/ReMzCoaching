import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function ResetPassword() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
        "Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  axios.defaults.withCredentials = true;
  const onSubmit = async (data) => {
    await axios
      .post(`${whichAPI}/reset-password/${id}/${token}`, data)
      .then((res) => {
        if (res.data.Status === "Successfully reset password") {
          console.log(res, data);
          navigate("/login");
          setSuccess(true);
        }
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }
  }, []);
  return (
    <>
      <h1>Reset Password</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} ref={inputRef}>
        <br />
        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <br />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirm Password..."
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p>{errors.confirmPassword.message}</p>
        ) : (
          <br />
        )}

        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <p>Submitting...</p>
          ) : isSubmitting && !success ? (
            <p>Error Resetting Password</p>
          ) : success ? (
            <p>Password reset sent</p>
          ) : (
            <p>Reset Password</p>
          )}
        </button>

        <br />
        {errors.root && <p>{errors.root.message}</p>}
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default ResetPassword;
