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

  const {
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipToggle,
    isTooltipVisible,
    navigate,
  } = useUtilities();

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
              {errors.product_school ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>School</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_school")}
                    placeholder={
                      isTooltipVisible && errors.product_school
                        ? errors.product_school.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>School</label>
                  <input
                    type="text"
                    {...register("product_school")}
                    defaultValue={product.product_school}
                  />
                </>
              )}
              {errors.product_activity ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Activity</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_activity")}
                    placeholder={
                      isTooltipVisible && errors.product_activity
                        ? errors.product_activity.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Activity</label>
                  <input
                    type="text"
                    {...register("product_activity")}
                    defaultValue={product.product_activity}
                  />
                </>
              )}
              {errors.product_description ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Description</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_description")}
                    placeholder={
                      isTooltipVisible && errors.product_description
                        ? errors.product_description.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Description</label>
                  <input
                    type="text"
                    {...register("product_description")}
                    defaultValue={product.product_description}
                  />
                </>
              )}
              {errors.product_criteria ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Year group</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_criteria")}
                    placeholder={
                      isTooltipVisible && errors.product_criteria
                        ? errors.product_criteria.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Year group</label>
                  <input
                    type="text"
                    {...register("product_criteria")}
                    defaultValue={product.product_criteria}
                  />
                </>
              )}
              {errors.product_day ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Runs on</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_day")}
                    placeholder={
                      isTooltipVisible && errors.product_day
                        ? errors.product_day.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Activity</label>
                  <input
                    type="text"
                    {...register("product_day")}
                    defaultValue={product.product_day}
                  />
                </>
              )}
              {errors.product_price ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Price</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_price")}
                    placeholder={
                      isTooltipVisible && errors.product_price
                        ? errors.product_price.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Price</label>
                  <input
                    type="text"
                    {...register("product_price")}
                    defaultValue={product.product_price}
                  />
                </>
              )}
              {errors.product_activity_duration ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Occurence</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_activity_duration")}
                    placeholder={
                      isTooltipVisible && errors.product_activity_duration
                        ? errors.product_activity_duration.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Occurence</label>
                  <input
                    type="text"
                    {...register("product_activity_duration")}
                    defaultValue={product.product_activity_duration}
                  />
                </>
              )}
              {errors.product_time ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Duration</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="text"
                    {...register("product_time")}
                    placeholder={
                      isTooltipVisible && errors.product_time
                        ? errors.product_time.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Duration</label>
                  <input
                    type="text"
                    {...register("product_time")}
                    defaultValue={product.product_time}
                  />
                </>
              )}
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
