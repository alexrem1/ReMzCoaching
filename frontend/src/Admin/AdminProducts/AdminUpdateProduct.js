import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function AdminUpdateProduct() {
  const schema = yup.object().shape({
    product_school: yup.string().required("School is required"),
    product_activity: yup.string().required("Activity is required"),
    product_criteria: yup.string().required("Criteria is required"),
    product_day: yup.string().required("Day is required"),
    product_price: yup
      .number()
      .integer()
      .typeError("A valid price is required")
      .required("Price is required"),
    product_activity_duration: yup
      .number()
      .integer()
      .typeError("Occurence is required")
      .required("Occurence is required"),
    product_time: yup.string().required("Duration is required"),
    product_description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    errorMessage,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedProduct, setSelectedProduct] = useState([]);

  const { id } = useParams();

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${whichAPI}/products/${id}`);

        console.log(res.data, "product fetched successfully");

        setSelectedProduct(res.data);

        // /products/product-update
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  async function onsubmit(data) {
    console.log(data, "updatedProduct");
    try {
      const res = await axios.put(
        `${whichAPI}/admin-update-product/${id}`,
        data
      );
      navigate("/admin");
      console.log(res);
    } catch (error) {}
  }

  const navigate = useNavigate();
  console.log(isSubmitSuccessful && !isSubmitting);
  return (
    <div>
      {selectedProduct && (
        <form onSubmit={handleSubmit(onsubmit)}>
          {selectedProduct.map((product, index) => (
            <div key={product.product_id}>
              <h3>Add a new product</h3>
              <p>School: </p>
              <input
                {...register("product_school")}
                placeholder="Enter School Name"
                defaultValue={product.product_school}
              />
              {errors.product_school && <p>{errors.product_school.message}</p>}
              <p>Activity: </p>
              <input
                {...register("product_activity")}
                placeholder="What activity is it?"
                defaultValue={product.product_activity}
              />
              {errors.product_activity && (
                <p>{errors.product_activity.message}</p>
              )}
              <p>Price: </p>
              <input
                {...register("product_price")}
                placeholder="E.g 25"
                defaultValue={product.product_price}
              />
              {errors.product_price && <p>{errors.product_price.message}</p>}
              <p>Occurence: </p>
              <input
                {...register("product_activity_duration")}
                placeholder="1 for 1 day, 10 for 10 weeks"
                defaultValue={product.product_activity_duration}
              />
              {errors.product_activity_duration && (
                <p>{errors.product_activity_duration.message}</p>
              )}
              <p>Duration: </p>
              <input
                {...register("product_time")}
                placeholder="E.g 2:30 PM - 5 PM"
                defaultValue={product.product_time}
              />
              {errors.product_time && <p>{errors.product_time.message}</p>}
              <p>Description: </p>
              <input
                {...register("product_description")}
                placeholder="Describe the activity"
                defaultValue={product.product_description}
              />
              {errors.product_description && (
                <p>{errors.product_description.message}</p>
              )}
              <p>Year groups: </p>
              <input
                {...register("product_criteria")}
                placeholder="E.g Reception - Year 6"
                defaultValue={product.product_criteria}
              />
              {errors.product_criteria && (
                <p>{errors.product_criteria.message}</p>
              )}

              <p>Runs on:</p>
              <input
                {...register("product_day")}
                placeholder="E.g Monday or Tuesday - Friday"
                defaultValue={product.product_day}
              />
              {errors.product_day && <p>{errors.product_day.message}</p>}

              <br />
              <button
                className="primary-cta"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <p>Updating product...</p>
                ) : isSubmitSuccessful ? (
                  <p>Product updated</p>
                ) : (
                  <p>Update product</p>
                )}
              </button>
            </div>
          ))}
        </form>
      )}
      <button
        onClick={() => {
          navigate("/admin");
        }}
      >
        Back
      </button>
    </div>
  );
}

export default AdminUpdateProduct;
