import ButtonLoad from "../../Components/ButtonLoad";
import { AlertCircle, ArrowLeftCircle } from "lucide-react";
import useUtilities from "../../CustomHooks/useUtilities";
import useAdminProducts from "../../CustomHooks/useAdminProducts";

function AdminAddProduct() {
  const { navigate } = useUtilities();

  const {
    addProductSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
  } = useAdminProducts();

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit(addProductSubmit)}
        className="form-container-form"
      >
        <h3>Add a new product</h3>
        <div className="content">
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_school ? "block" : "none",
                }}
              >
                *
              </span>
              <label>School</label>
              <AlertCircle
                style={{
                  display: errors.product_school ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_school ? errors.product_school.message : null}
              </label>
            </div>
            <input
              type="text"
              style={{
                borderBottom: errors.product_school
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_school")}
            />
          </>

          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_activity ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Activity</label>
              <AlertCircle
                style={{
                  display: errors.product_activity ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_activity
                  ? errors.product_activity.message
                  : null}
              </label>
            </div>
            <input
              type="text"
              style={{
                borderBottom: errors.product_school
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_activity")}
            />
          </>
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_description ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Description</label>
              <AlertCircle
                style={{
                  display: errors.product_description ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_description
                  ? errors.product_description.message
                  : null}
              </label>
            </div>
            <input
              type="text"
              style={{
                borderBottom: errors.product_description
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_description")}
            />
          </>
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_criteria ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Year Group</label>
              <AlertCircle
                style={{
                  display: errors.product_criteria ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_criteria
                  ? errors.product_criteria.message
                  : null}
              </label>
            </div>
            <input
              type="text"
              style={{
                borderBottom: errors.product_criteria
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_criteria")}
            />
          </>
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_day ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Runs on</label>
              <AlertCircle
                style={{
                  display: errors.product_day ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_day ? errors.product_day.message : null}
              </label>
            </div>
            <input
              type="text"
              style={{
                borderBottom: errors.product_day
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_day")}
            />
          </>
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_price ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Price</label>
              <AlertCircle
                style={{
                  display: errors.product_price ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_price ? errors.product_price.message : null}
              </label>
            </div>
            <input
              type="number"
              style={{
                borderBottom: errors.product_price
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_price")}
            />
          </>
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_activity_duration ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Occurence</label>
              <AlertCircle
                style={{
                  display: errors.product_activity_duration ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_activity_duration
                  ? errors.product_activity_duration.message
                  : null}
              </label>
            </div>
            <input
              type="number"
              style={{
                borderBottom: errors.product_activity_duration
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_activity_duration")}
            />
          </>
          <>
            <div className="tooltip-container">
              <span
                className="error"
                style={{
                  display: errors.product_time ? "block" : "none",
                }}
              >
                *
              </span>
              <label>Duration</label>
              <AlertCircle
                style={{
                  display: errors.product_time ? "block" : "none",
                }}
                className="tooltip-trigger"
                aria-label="More info"
              />
            </div>
            <div>
              <label style={{ padding: "0" }}>
                {errors.product_time ? errors.product_time.message : null}
              </label>
            </div>
            <input
              type="text"
              style={{
                borderBottom: errors.product_time
                  ? "1px solid red"
                  : "1px solid black",
              }}
              {...register("product_time")}
            />
          </>
          <ButtonLoad
            isSubmittingText="Adding product..."
            isSubmitSuccessfulText="Product added successfully"
            defaultText="Add product"
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
            disabled={isSubmitting}
          />
          <button
            className="secondary-cta"
            onClick={() => {
              navigate("/admin");
            }}
          >
            <ArrowLeftCircle />
            <p>Back</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAddProduct;
