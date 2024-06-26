import { useLocation, useNavigate } from "react-router-dom";
import useGetProfile from "./useGetProfile";
import useRegistration from "./useRegistration";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function useUpdateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.pathname.split("/")[3];

  const { schema, setStep, step, nextStep, prevStep, disabledDOB } =
    useRegistration();

  const modifiedSchema = schema.omit(["CarerFirstName", "CarerLastName"]);

  const { userDetails } = useGetProfile();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(modifiedSchema),
  });

  const inputRef = useRef();

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.querySelector("input").focus();
    }

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      if (
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
    // console.log(data);
    data.FirstChildDOB = dayjs(data.FirstChildDOB).format("DD/MM/YYYY");
    data.SecondChildDOB =
      data.SecondChildDOB && dayjs(data.SecondChildDOB).format("DD/MM/YYYY");

    try {
      const token = sessionStorage.getItem("token");
      // Fetch CSRF token
      const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
      const csrfToken = csrfResponse.data.csrfToken;

      // Include CSRF token and Authorization token in headers
      const headers = {
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${token}`,
      };
      await axios
        .put(`${whichAPI}/users/${userID}`, data, {
          headers,
        })
        .then((res) => {
          if (step === 3) {
            if (res.data.Status === "User updated successfully") {
              // console.log("success update", res);
              navigate("/profile");
            } else {
              setError("root", { message: res.data.Error });
              // console.log("error update", res);
            }
          }
        });
    } catch (error) {
      // console.log("error", error);
      setError("root", { message: error.message });
    }
  };

  return {
    navigate,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
    userDetails,
    inputRef,
    step,
    nextStep,
    prevStep,
    disabledDOB,
  };
}
