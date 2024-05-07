import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useForgotPassword() {
  const inputRef = useRef();
  const [resetSuccess, setResetSuccess] = useState(false);

  const schema = yup.object().shape({
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Your email is required"),
  });

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
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${whichAPI}/forgot-password`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.Status === "Successfully requested password reset") {
        setResetSuccess(true);
      }
    } catch (err) {
      // console.log(err, "err");
      setError("root", {
        message: err.response.data.Error,
      });
    }
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }
  }, []);

  return {
    inputRef,
    onSubmit,
    resetSuccess,
    register,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    isSubmitting,
  };
}
