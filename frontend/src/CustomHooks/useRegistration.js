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
    CarerLastName: yup.string().required("Your Last name is required"),
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Your email is required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ContactNumber: yup
      .number()
      .integer()
      .typeError("A valid contact number is required")
      .required("Your contact number is required"),
    EmergencyContactNumber: yup
      .number()
      .integer()
      .typeError("A valid emergency contact number is required"),
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
    FirstChildFirstName: yup
      .string()
      .required("Your child's first name is required"),
    FirstChildLastName: yup
      .string()
      .required("Your child's second name is required"),
    FirstChildDOB: yup
      .string()
      .required("Your first child's date of birth is required"),
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
    Permission: yup.bool(),
    PupilPremium: yup.bool(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      CarerFirstName: "remmy",
      CarerLastName: "remmy",
      Email: "remidy@live.co.ukk",
      ContactNumber: 20,
      EmergencyContactNumber: 20,
      FirstChildFirstName: "remmy",
      FirstChildLastName: "test",
      FirstChildDOB: dayjs().format("YYYY-MM-DD"),
      FirstChildYearGroup: "7",
      FirstChildMedical: "N/A",
      password: "93MDLuffy!!!",
      confirmPassword: "93MDLuffy!!!",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

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

  const inputRef = useRef();
  const removeChild = () => {
    setChildCount((prevCount) => prevCount - 1);

    // reset({
    //   SecondChildFirstName: "",
    //   SecondChildLastName: "",
    //   SecondChildDOB: "",
    //   SecondChildMedical: "",
    //   SecondChildYearGroup: "",
    // });
    console.log("reset");
  };

  const [permission, setPermission] = useState(false);
  const [pupilPremium, setPupilPremium] = useState(false);

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
        errors.FirstChildFirstName ||
        errors.FirstChildLastName ||
        errors.FirstChildYearGroup ||
        errors.FirstChildMedical ||
        errors.FirstChildDOB
      ) {
        // If not, set the step to 2
        setStep(2);
      }
    }
  }, [step, errors, childCount, permission, pupilPremium]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const onSubmit = async (data) => {
    console.log(data);
    // if (childCount === 1) {
    //   data.SecondChildFirstName = "";
    //   data.SecondChildLastName = "";
    //   data.SecondChildDOB = "";
    //   data.SecondChildMedical = "";
    //   data.SecondChildYearGroup = "";
    // }
    const formattedFirstChildDOB = dayjs(data.FirstChildDOB).format(
      "DD/MM/YYYY"
    );
    const formattedSecondChildDOB = data.SecondChildDOB
      ? dayjs(data.SecondChildDOB).format("DD/MM/YYYY")
      : null;
    data.FirstChildDOB = formattedFirstChildDOB;
    data.SecondChildDOB = formattedSecondChildDOB;
    data.Permission = permission;
    data.PupilPremium = pupilPremium;
    // await axios.post(`${whichAPI}/register`, data).then((res) => {
    //   if (step === totalSteps) {
    //     console.log("Final Form Data: ", data);
    //     if (res.data.Status === "User registered successfully") {
    //       console.log(res, "success");
    //       navigate("/login");
    //       reset();
    //     } else {
    //       console.log(res, "err");
    //       setError("root", {
    //         message: res.data.Error,
    //       });
    //     }
    //   }
    // });
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
    setPupilPremium,
    setPermission,
    permission,
    pupilPremium,
    inputRef,
  };
}
