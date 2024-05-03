import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
export default function useRegistration() {
  const schema = yup.object().shape({
    CarerFirstName: yup.string().required("Your first name is required"),
    CarerLastName: yup.string().required("Your last name is required"),
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ContactNumber: yup
      .string()
      .length(11, "Enter a valid contact number")
      .required("Your contact number is required"),
    EmergencyContactNumber: yup
      .string()
      .length(11, "Enter a valid emergency contact number")
      .required("Your emergency contact number is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
        "Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Your passwords do not match, please ensure they match."
      )
      .required("Confirm Password is required"),
    AddressLine1: yup.string().required("Enter your address line 1."),
    AddressLine2: yup.string(),
    AddressCityTown: yup.string().required("Enter your city or town."),
    AddressPostcode: yup.string().required("Enter your postcode."),
    FirstChildFirstName: yup
      .string()
      .required("Your child's first name is required"),
    FirstChildLastName: yup
      .string()
      .required("Your child's second name is required"),
    FirstChildDOB: yup.string().required("Select their DOB"),
    FirstChildYearGroup: yup
      .string()
      .required("Please enter your child's year group"),
    FirstChildMedical: yup
      .string()
      .required("Please enter your child's medical info"),
    SecondChildFirstName: yup.string(),
    SecondChildLastName: yup.string(),
    SecondChildDOB: yup.string(),
    SecondChildYearGroup: yup.string(),
    SecondChildMedical: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [childCount, setChildCount] = useState(1); // Initial count includes the first two children

  const addChild = () => {
    setChildCount((prevCount) => prevCount + 1);
  };

  const removeChild = () => {
    setChildCount((prevCount) => prevCount - 1);
  };

  //   const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }
  }, []);

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      if (
        errors.CarerFirstName ||
        errors.CarerLastName ||
        errors.Email ||
        errors.ContactNumber ||
        errors.EmergencyContactNumber ||
        errors.password ||
        errors.confirmPassword
      ) {
        setStep(1);
      } else if (
        errors.AddressLine1 ||
        errors.AddressCityTown ||
        errors.AddressPostcode
      ) {
        setStep(2);
      }
    }
  }, [errors, step]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const onSubmit = async (data) => {
    if (childCount === 1) {
      data.SecondChildFirstName = "";
      data.SecondChildLastName = "";
      data.SecondChildDOB = "";
      data.SecondChildMedical = "";
      data.SecondChildYearGroup = "";
    }
    data.FirstChildDOB = dayjs(data.FirstChildDOB).format("DD/MM/YYYY");
    data.SecondChildDOB =
      data.SecondChildDOB && dayjs(data.SecondChildDOB).format("DD/MM/YYYY");

    // console.log(data);
    await axios.post(`${whichAPI}/register`, data).then((res) => {
      if (step === 3) {
        // console.log("Final Form Data: ", data);
        if (res.data.Status === "User registered successfully") {
          // console.log(res, "success");
          navigate("/login");
          reset();
        } else {
          // console.log(res, "err");
          setError("root", {
            message: res.data.Error,
          });
        }
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
    step,
    nextStep,
    prevStep,
    control,
    childCount,
    addChild,
    removeChild,
    schema,
    inputRef,
    setStep,
  };
}
