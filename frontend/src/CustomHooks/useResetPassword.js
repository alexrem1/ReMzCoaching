import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useResetPassword() {
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
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const onSubmit = async (data) => {
    // Fetch CSRF token
    const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
    const csrfToken = csrfResponse.data.csrfToken;

    // Include CSRF token and Authorization token in headers
    const headers = {
      "X-CSRF-Token": csrfToken,
    };
    await axios
      .post(`${whichAPI}/reset-password/${id}/${token}`, data, { headers })
      .then((res) => {
        if (res.data.Status === "Successfully reset password") {
          setSuccess(true);
          // console.log(res, data);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        setSuccess(false);
        setError("root", { message: err.response.data.Error });
      });
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }
  }, []);

  return {
    onSubmit,
    success,
    isSubmitSuccessful,
    isSubmitting,
    errors,
    register,
    handleSubmit,
    inputRef,
  };
}
