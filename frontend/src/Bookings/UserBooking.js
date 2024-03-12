import React from "react";
import CustomDatePicker from "../Components/DatePickerWeekends";
import { Controller } from "react-hook-form";
import CustomSelect from "../Components/SelectTime";
import useBookings from "../CustomHooks/useBookings";
import SelectChild from "../Components/SelectChild";
import { useGetProducts } from "../CustomHooks/useGetProducts";

function UserBooking() {
  const {
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    defaultTimes,
    disabledDate,
  } = useBookings();

  const { products } = useGetProducts();

  // console.log(products.length > 0 && products[0], "userbooking");

  return (
    <>
      <h1>School 1 booking</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="selectedName"
          control={control}
          render={({ field }) => <SelectChild field={field} errors={errors} />}
        />
        <Controller
          name="selectedDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              field={field}
              errors={errors}
              disabledDate={disabledDate}
            />
          )}
        />
        <Controller
          name="selectedTime"
          control={control}
          render={({ field }) => (
            <CustomSelect
              field={field}
              defaultTimes={defaultTimes}
              errors={errors}
            />
          )}
        />
        {products.length > 0 && (
          <input
            // style={{ display: "none" }}
            {...register("product_id")}
            type="number"
            defaultValue={products[0].product_id}
          />
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
      <>
        <p>price: </p>
      </>
    </>
  );
}

export default UserBooking;
