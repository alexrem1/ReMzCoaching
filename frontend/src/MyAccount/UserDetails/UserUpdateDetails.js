import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import CustomDatePicker from "../../Components/DatePickerWeekends";
import useBookings from "../../CustomHooks/useBookings";

function UserUpdateDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.pathname.split("/")[3];
  const { disabledDate } = useBookings();

  const schema = yup.object().shape({
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Your email is required"),
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
    setError,
    control,
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

  const [permission, setPermission] = useState(false);
  const [pupilPremium, setPupilPremium] = useState(false);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;
  const onSubmit = async (data) => {
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
    try {
      await axios.put(`${whichAPI}/users/${userID}`, data).then((res) => {
        if (res.data.Status === "User updated successfully") {
          console.log("success update", res);
          navigate("/profile");
        } else {
          setError("root", { message: res.data.Error });
          console.log("error update", res);
        }
      });
    } catch (error) {
      console.log("error", error);
      setError("root", { message: error.message });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} ref={inputRef}>
        <br />
        <h3>Carer Details</h3>
        <input type="text" placeholder="Email..." {...register("Email")} />
        {errors.Email && <p>{errors.Email.message}</p>}

        <input
          type="number"
          placeholder="Contact Number..."
          {...register("ContactNumber")}
        />
        <br />
        {errors.ContactNumber && <p>{errors.ContactNumber.message}</p>}
        <input
          type="number"
          placeholder="Emergency Contact Number..."
          {...register("EmergencyContactNumber")}
        />
        <br />
        {errors.EmergencyContactNumber && (
          <p>{errors.EmergencyContactNumber.message}</p>
        )}

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

        <h3>Children Details</h3>
        <input
          type="text"
          placeholder="First Child First Name..."
          {...register("FirstChildFirstName")}
        />
        {errors.FirstChildFirstName && (
          <p>{errors.FirstChildFirstName.message}</p>
        )}
        <input
          type="text"
          placeholder="First Child Last Name..."
          {...register("FirstChildLastName")}
        />
        {errors.FirstChildLastName && (
          <p>{errors.FirstChildLastName.message}</p>
        )}

        <ConfigProvider>
          <Controller
            name="FirstChildDOB"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                field={field}
                errors={errors}
                disabledDate={disabledDate}
              />
            )}
          />
        </ConfigProvider>

        <input
          type="text"
          placeholder="First Child Year Group..."
          {...register("FirstChildYearGroup")}
        />
        {errors.FirstChildYearGroup && (
          <p>{errors.FirstChildYearGroup.message}</p>
        )}
        <input
          type="text"
          placeholder="First Child Medical Info"
          {...register("FirstChildMedical")}
        />
        {errors.FirstChildMedical && <p>{errors.FirstChildMedical.message}</p>}
        <input
          type="text"
          placeholder="Second Child First Name..."
          {...register("SecondChildFirstName")}
        />
        <input
          type="text"
          placeholder="Second Child Last Name..."
          {...register("SecondChildLastName")}
        />

        <ConfigProvider>
          <Controller
            name="SecondChildDOB"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                field={field}
                errors={errors}
                disabledDate={disabledDate}
              />
            )}
          />
        </ConfigProvider>
        <input
          type="text"
          placeholder="Second Child Year Group..."
          {...register("SecondChildYearGroup")}
        />

        <input
          type="text"
          placeholder="Second Child Medical Info"
          {...register("SecondChildMedical")}
        />
        <h3>Permissions</h3>
        <label htmlFor="Permission">Permission:</label>
        <Controller
          name="Permission"
          control={control}
          render={({ field }) => (
            <input
              id="Permission"
              type="checkbox"
              {...field}
              onChange={(e) => {
                const newValue = e.target.checked;
                field.onChange(newValue);
                setPermission(newValue);
              }}
            />
          )}
        />
        <label htmlFor="PupilPremium">Pupil Premium:</label>
        <Controller
          name="PupilPremium"
          control={control}
          render={({ field }) => (
            <input
              id="PupilPremium"
              type="checkbox"
              {...field}
              onChange={(e) => {
                const newValue = e.target.checked;
                field.onChange(newValue);
                setPupilPremium(newValue);
              }}
            />
          )}
        />
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <p>Updating details...</p>
          ) : errors.root ? (
            <p>Try again</p>
          ) : isSubmitSuccessful && !errors.root ? (
            <p>Details updated successfully</p>
          ) : (
            <p>Update Details</p>
          )}
        </button>

        <br />
        {errors.root && <p>{errors.root.message}</p>}
      </form>
      <button
        onClick={() => {
          navigate("/profile");
        }}
      >
        Back
      </button>
    </div>
  );
}

export default UserUpdateDetails;
