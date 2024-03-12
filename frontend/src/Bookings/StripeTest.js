import React, { useEffect, useState } from "react";
import CustomDatePicker from "../Components/DatePickerWeekends";
import { Controller } from "react-hook-form";
import CustomSelect from "../Components/SelectTime";
import useBookings from "../CustomHooks/useBookings";
import SelectChild from "../Components/SelectChild";
import { useGetProducts } from "../CustomHooks/useGetProducts";

function StripeTest() {
  const { register, handleSubmit, onSubmit, handleDivClick } = useBookings();

  const { products } = useGetProducts();

  const productsReadyToConsume = products.length > 0 && products;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Let's test</h1>
        {products.length > 0 &&
          productsReadyToConsume.map((product, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
                key={product.product_id}
                id={product.product_id}
                onClick={() => handleDivClick(product)}
              >
                <p>School: {product.product_school}</p>
                <input
                  type="hidden"
                  {...register("product_school")}
                  value={product.product_school}
                />
                <p>Activity: {product.product_activity}</p>
                <input
                  type="hidden"
                  {...register("product_activity")}
                  value={product.product_activity}
                />
                <p>Price: £{product.product_price}</p>
                <input
                  type="hidden"
                  {...register("product_price")}
                  value={product.product_price}
                />
                <p>
                  Occurence:{" "}
                  {product.product_activity_duration > 1 ? (
                    product.product_activity_duration
                  ) : (
                    <span>Daily</span>
                  )}
                </p>
                <input
                  type="hidden"
                  {...register("product_activity_duration")}
                  value={product.product_activity_duration}
                />
                <p>Duration: {product.product_time}</p>
                <input
                  type="hidden"
                  {...register("product_time")}
                  value={product.product_time}
                />
                <button type="submit">Submit</button>
              </div>
            );
          })}
      </form>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
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
      </> */}
    </>
  );
}

export default StripeTest;
