import CustomDatePicker from "../Components/DatePickerWeekends";
import { Controller } from "react-hook-form";
import useBookings from "../CustomHooks/useBookings";
import SelectChild from "../Components/SelectChild";
import { useGetProducts } from "../CustomHooks/useGetProducts";
import useGetProfile from "../CustomHooks/useGetProfile";
import { useState } from "react";
import useUtilities from "../CustomHooks/useUtilities";

function Products() {
  const {
    register,
    handleSubmit,
    onSubmit,
    handleDivClick,
    control,
    errors,
    disabledDate,
  } = useBookings();

  const { products } = useGetProducts();

  const { userDetails } = useGetProfile();

  const productsReadyToConsume = products.length > 0 && products;

  const { activeProductIndex, handleNextProduct, handlePrevProduct } =
    useUtilities(productsReadyToConsume);

  return (
    <div className="form-container products">
      <h1>Services</h1>
      {products.length > 0 && (
        <form className="form-container-form" onSubmit={handleSubmit(onSubmit)}>
          {productsReadyToConsume.map((product, index) => (
            <div
              key={product.product_id}
              id={product.product_id}
              className={`content ${
                index === activeProductIndex ? "active" : ""
              }`}
              onClick={() => handleDivClick(product)}
            >
              <p>{product.product_school}</p>
              <input
                type="hidden"
                {...register("product_school")}
                value={product.product_school}
              />
              <p>{product.product_activity}</p>
              <input
                type="hidden"
                {...register("product_activity")}
                value={product.product_activity}
              />
              <p>Must be between {product.product_criteria}</p>
              <input
                type="hidden"
                {...register("product_criteria")}
                value={product.product_criteria}
              />
              <p>Takes place on {product.product_day}</p>
              <input
                type="hidden"
                {...register("product_day")}
                value={product.product_day}
              />
              <p>£{product.product_price}</p>
              <input
                type="hidden"
                {...register("product_price")}
                value={product.product_price}
              />
              <p>
                {product.product_activity_duration > 1 ? (
                  <span>
                    Duration of {product.product_activity_duration} weeks
                  </span>
                ) : (
                  <span>Daily</span>
                )}
              </p>
              <input
                type="hidden"
                {...register("product_activity_duration")}
                value={product.product_activity_duration}
              />
              <p>Runs from {product.product_time}</p>
              <input
                type="hidden"
                {...register("product_time")}
                value={product.product_time}
              />
              {/* Discounted */}
              <div className="product-selects">
                {product.product_activity_duration < 10 &&
                product.product_activity.includes("Discounted") &&
                userDetails[0] &&
                !userDetails[0].SecondChildFirstName ? null : (
                  <Controller
                    name={`select_child_for_product${index + 1}`}
                    control={control}
                    render={({ field }) => (
                      <SelectChild
                        field={field}
                        errors={errors}
                        prod={product}
                      />
                    )}
                  />
                )}

                {product.product_activity_duration < 10 && (
                  <>
                    {product.product_activity_duration < 10 &&
                    product.product_activity.includes("Discounted") &&
                    userDetails[0] &&
                    !userDetails[0].SecondChildFirstName ? null : (
                      <Controller
                        name={`select_date_for_product${index + 1}`}
                        control={control}
                        render={({ field }) => (
                          <CustomDatePicker
                            field={field}
                            errors={errors}
                            disabledDate={disabledDate}
                            placeholder={"Select a date"}
                          />
                        )}
                      />
                    )}
                  </>
                )}
              </div>
              {errors && errors[`select_child_for_product${index + 1}`] && (
                <p className="error">
                  {errors[`select_child_for_product${index + 1}`].message}
                </p>
              )}
              {errors && errors[`select_date_for_product${index + 1}`] && (
                <p className="error">
                  {errors[`select_date_for_product${index + 1}`].message}
                </p>
              )}
              {product.product_activity_duration < 10 &&
              product.product_activity.includes("Discounted") &&
              userDetails[0] &&
              !userDetails[0].SecondChildFirstName ? (
                <p className="error">You're not eligible for this service.</p>
              ) : (
                <div>
                  <button className="primary-cta" type="submit">
                    Book now
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="product-btns">
            <button
              className="other-button"
              type="button"
              onClick={handlePrevProduct}
            >
              Previous
            </button>
            <button
              className="other-button"
              type="button"
              onClick={handleNextProduct}
            >
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Products;
