// import dayjs from "dayjs";
// import "dayjs/locale/en-gb";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useIsAuthenticated } from "../Context/AuthContext";
import { useState } from "react";

export default function useBookings() {
  const { userID } = useIsAuthenticated();

  const schema = yup.object().shape({
    // selectedDate: yup.string().required("Please select a date"),
    // selectedTime: yup.string().required("Please select a time"),
    // selectedName: yup.string().required("Please select a child"),
    // product_id: yup.number(),
    // product_school: yup.string(),
  });
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const disabledDate = (current) => {
  //   // Disable weekends (Saturday and Sunday)
  //   if (current.day() === 0 || current.day() === 6) {
  //     return true;
  //   }
  //   // Disable dates before today
  //   return current < dayjs().startOf("day");
  // };

  // const defaultTimes = [
  //   { label: "9:00 AM", value: dayjs().set("hour", 9).set("minute", 0) },
  //   { label: "12:00 PM", value: dayjs().set("hour", 12).set("minute", 0) },
  //   { label: "3:00 PM - ", value: dayjs().set("hour", 15).set("minute", 0) },
  //   // Add more default time options as needed
  // ];
  const navigate = useNavigate();
  const [productSelected, setProductSelected] = useState(""); // State to store clicked product id
  const productChosen = productSelected;

  const handleDivClick = (product) => {
    setProductSelected(product);
  };

  const onSubmit = async (data) => {
    console.log(productChosen);

    const whichAPI =
      window.location.hostname === "localhost"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_VURL;

    // console.log(
    //   `${whichAPI}/create-payment-intent/${productChosen.product_id}`
    // );
    try {
      navigate(`/payment/${productChosen.product_id}`);
      // const response = await axios.post(
      //   `${whichAPI}/create-payment-intent/${productChosen.product_id}`,
      //   {
      //     items: { productChosen },
      //   }
      // );

      // console.log(response);

      // // Handle the response properly
      // if (response.status === 200) {
      //   const { clientSecret } = response.data;
      //   // Navigate to the payment page and pass client secret
      //   navigate(`/payment/${productChosen.product_id}`, {
      //     state: { clientSecret, productChosen },
      //   });
      //   console.log(response);
      // } else {
      //   console.error("Failed to create payment intent");
      // }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  // const submitBookingToServer = async (paymentMethod, data) => {
  //   // const selectedDate = dayjs(data.selectedDate).format("dddd, DD MM YYYY");
  //   // const selectedTime = data.selectedTime;
  //   // const selectedName = data.selectedName;
  //   console.log(data);
  //   try {
  //     const response = await axios.post("http://localhost:3001/bookings", {
  //       paymentMethod,
  //       userID,
  //       // selectedDate,
  //       // selectedTime,
  //       // selectedName,
  //       // product_id,
  //     });
  //     console.log(response);

  //     if (response.data.status === "Booking registered successfully") {
  //       console.log(response, "booking made");
  //       navigate("/profile");
  //     } else {
  //       console.log(response, "booking failed");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting booking:", error);
  //   }
  // };
  return {
    register,
    // control,
    handleSubmit,
    errors,
    onSubmit,
    // defaultTimes,
    // disabledDate,
    handleDivClick,
  };
}
