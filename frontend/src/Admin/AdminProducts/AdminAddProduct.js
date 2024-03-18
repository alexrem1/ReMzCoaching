import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminAddProduct() {
  const navigate = useNavigate();

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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);

    const whichAPI =
      window.location.hostname === "localhost"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_VURL;

    try {
      axios.post(`${whichAPI}/admin-add-product`, data).then((res) => {
        console.log(res);
        navigate("/admin");
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add a new product</h3>
        <>
          <p>School: </p>
          <input
            {...register("product_school")}
            placeholder="Enter School Name"
          />
          {errors.product_school && <p>{errors.product_school.message}</p>}
          <p>Activity: </p>
          <input
            {...register("product_activity")}
            placeholder="What activity is it?"
          />
          {errors.product_activity && <p>{errors.product_activity.message}</p>}
          <p>Description: </p>
          <input
            {...register("product_description")}
            placeholder="Describe the activity"
          />
          {errors.product_description && (
            <p>{errors.product_description.message}</p>
          )}
          <p>Year groups: </p>
          <input
            {...register("product_criteria")}
            placeholder="E.g Reception - Year 6"
          />
          {errors.product_criteria && <p>{errors.product_criteria.message}</p>}

          <p>Runs on:</p>
          <input
            {...register("product_day")}
            placeholder="E.g Monday or Tuesday - Friday"
          />
          {errors.product_day && <p>{errors.product_day.message}</p>}

          <p>Price: </p>
          <input {...register("product_price")} placeholder="E.g 25" />
          {errors.product_price && <p>{errors.product_price.message}</p>}
          <p>Occurence: </p>
          <input
            {...register("product_activity_duration")}
            placeholder="1 for 1 day, 10 for 10 weeks"
          />
          {errors.product_activity_duration && (
            <p>{errors.product_activity_duration.message}</p>
          )}
          <p>Duration: </p>
          <input
            {...register("product_time")}
            placeholder="E.g 2:30 PM - 5 PM"
          />
          {errors.product_time && <p>{errors.product_time.message}</p>}
          <br />
          <button className="primary-cta" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <p>Adding product...</p>
            ) : isSubmitSuccessful ? (
              <p>Product added</p>
            ) : (
              <p>Add a new product</p>
            )}
          </button>
        </>
      </form>

      <button
        className="primary-cta"
        onClick={() => {
          navigate("/admin");
        }}
      >
        Back
      </button>
    </div>
  );
}

export default AdminAddProduct;
