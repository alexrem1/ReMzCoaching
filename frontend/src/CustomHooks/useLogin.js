import axios from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../Context/AuthContext";

export default function useLogin() {
  const schema = yup.object().shape({
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Your email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //   const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }
  }, []);

  const { setAuth, setRole, setLoading } = useIsAuthenticated();

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await axios.post(`${whichAPI}/login`, data).then((res) => {
      if (res.data.Status === "User logged in successfully") {
        console.log(res, "success", res.data.role, res.data.name);
        setAuth(true);
        setLoading(false);
        setRole(res.data.role);
        // Redirect based on user role
        if (res.data.role === "admin") {
          navigate("/admin");
        } else if (res.data.role === "visitor") {
          navigate("/");
        }
      } else {
        console.log(res, "err");
        setError("root", {
          message: res.data.Error,
        });
        setAuth(false);
        setLoading(true);
        // inputRef.current.querySelector("input[name='email']").value = "";
        // inputRef.current.querySelector("input[name='email']").focus();
      }
    });
  };
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
    inputRef,
  };
}
