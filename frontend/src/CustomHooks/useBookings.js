import dayjs from "dayjs";
// import "dayjs/locale/en-gb";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useBookings() {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const disabledDate = (current) => {
    // Disable weekends (Saturday and Sunday)
    if (current.day() === 0 || current.day() === 6) {
      return true; // Weekend is disabled
    }

    // Disable dates before the current day
    if (current.isBefore(dayjs(), "day")) {
      return true;
    }

    // Define term dates for the academic year 2023/2024
    const termDates = [
      // Autumn Term 2023
      { start: "2023-09-04", end: "2023-10-20" },
      { start: "2023-10-06", end: "2023-12-20" },
      // Spring Term 2024
      { start: "2024-01-08", end: "2024-02-12" },
      { start: "2024-02-19", end: "2024-03-28" },
      // Summer Term 2024
      { start: "2024-04-15", end: "2024-05-24" },
      { start: "2024-06-03", end: "2024-07-26" },
    ];

    // Check if the current date falls within any term date range
    for (const term of termDates) {
      const startDate = dayjs(term.start);
      const endDate = dayjs(term.end);
      if (current.isAfter(startDate) && current.isBefore(endDate)) {
        // If current date falls within a term date range, it's enabled
        return false;
      }
    }

    // If the current date is not within any term date range, it's disabled
    return true;
  };
  const navigate = useNavigate();
  const [productSelected, setProductSelected] = useState(""); // State to store clicked product
  const productChosen = productSelected;

  const handleDivClick = (product) => {
    setProductSelected(product);
  };

  const onSubmit = (data) => {
    // console.log(productChosen, data);
    const child = data[`select_child_for_product${productChosen.product_id}`];
    const date =
      data[`select_date_for_product${productChosen.product_id}`] &&
      dayjs(data[`select_date_for_product${productChosen.product_id}`]).format(
        "DD/MM/YYYY"
      );

    // Get the current date and time
    const currentDateTime = dayjs();

    // Format the date and time as YYYY-MM-DD HH:mm:ss, which is the format expected by SQL DATETIME or TIMESTAMP columns
    const formattedDateTime = currentDateTime.format("DD/MM/YYYY HH:mm:ss");

    try {
      // custom validation
      if (data[`select_child_for_product${productChosen.product_id}`]) {
        if (productChosen.product_activity_duration < 10) {
          if (data[`select_date_for_product${productChosen.product_id}`]) {
            navigate(`/payment/${productChosen.product_id}`, {
              state: { child, date, formattedDateTime },
            });
            // console.log("child selected with date");
          } else {
            // console.log("child selected without date");
            setError(`select_date_for_product${productChosen.product_id}`, {
              message: "Please select a date for your booking",
            });
          }
        } else {
          // console.log("child selected and has no date functionality");
          navigate(`/payment/${productChosen.product_id}`, {
            state: { child, formattedDateTime },
          });
        }
      } else {
        setError(`select_child_for_product${productChosen.product_id}`, {
          message: "Please select your child for your booking",
        });
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    disabledDate,
    handleDivClick,
  };
}
