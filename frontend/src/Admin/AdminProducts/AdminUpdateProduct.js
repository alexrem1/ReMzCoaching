import useAdminProducts from "../../CustomHooks/useAdminProducts";
import useUtilities from "../../CustomHooks/useUtilities";
import ButtonLoad from "../../Components/ButtonLoad";
import { AlertCircle, ArrowLeftCircle } from "lucide-react";

function AdminUpdateProduct() {
  const {
    updateProductSubmit,
    selectedProduct,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
  } = useAdminProducts();

  const { navigate } = useUtilities();

  return (
    <div className="form-container">
      {selectedProduct && (
        <form
          onSubmit={handleSubmit(updateProductSubmit)}
          className="form-container-form"
        >
          {selectedProduct.map((product) => (
            <div key={product.product_id} className="content">
              <h3>Upate product</h3>

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
                    {errors.product_school
                      ? errors.product_school.message
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
                  defaultValue={product.product_school}
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
                  defaultValue={product.product_activity}
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
                  defaultValue={product.product_description}
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
                  defaultValue={product.product_criteria}
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
                  defaultValue={product.product_day}
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
                  defaultValue={product.product_price}
                  {...register("product_price")}
                />
              </>
              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.product_activity_duration
                        ? "block"
                        : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Occurence</label>
                  <AlertCircle
                    style={{
                      display: errors.product_activity_duration
                        ? "block"
                        : "none",
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
                  defaultValue={product.product_activity_duration}
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
                  defaultValue={product.product_time}
                  {...register("product_time")}
                />
              </>
              <ButtonLoad
                isSubmittingText="Updating product..."
                isSubmitSuccessfulText="Product updated successfully"
                defaultText="Update product"
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
          ))}
        </form>
      )}
    </div>
  );
}

export default AdminUpdateProduct;
