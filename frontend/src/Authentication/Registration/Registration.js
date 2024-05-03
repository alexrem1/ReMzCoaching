import useRegistration from "../../CustomHooks/useRegistration";
import { ConfigProvider, DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { ArrowLeftCircle, AlertCircle } from "lucide-react";
import ButtonLoad from "../../Components/ButtonLoad";
import CustomDatePicker from "../../Components/DatePickerWeekends";
import useUtilities from "../../CustomHooks/useUtilities";

function Registration() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
    step,
    nextStep,
    prevStep,
    control,
    addChild,
    childCount,
    removeChild,
    inputRef,
  } = useRegistration();

  const {
    isTooltipVisible,
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipToggle,
  } = useUtilities();

  return (
    <div className="form-container">
      <form
        className="form-container-form"
        onSubmit={handleSubmit(onSubmit)}
        ref={inputRef}
      >
        <h1>Register</h1>
        {step === 1 && (
          <>
            <h3>Step 1 of 3</h3>
            <div className="content">
              {errors.CarerFirstName ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>First name</label>
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
                    {...register("CarerFirstName")}
                    placeholder={
                      isTooltipVisible && errors.CarerFirstName
                        ? errors.CarerFirstName.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>First name</label>
                  <input type="text" {...register("CarerFirstName")} />
                </>
              )}

              {errors.CarerLastName ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Last name</label>
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
                    {...register("CarerLastName")}
                    placeholder={
                      isTooltipVisible && errors.CarerLastName
                        ? errors.CarerLastName.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Last name</label>
                  <input type="text" {...register("CarerLastName")} />
                </>
              )}

              {errors.Email ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Email</label>
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
                    {...register("Email")}
                    name="Email"
                    placeholder={
                      isTooltipVisible && errors.Email
                        ? errors.Email.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Email</label>
                  <input type="text" {...register("Email")} name="Email" />
                </>
              )}

              {errors.ContactNumber ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Contact number</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="number"
                    {...register("ContactNumber")}
                    placeholder={
                      isTooltipVisible && errors.ContactNumber
                        ? errors.ContactNumber.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Contact number</label>
                  <input type="number" {...register("ContactNumber")} />
                </>
              )}

              {errors.EmergencyContactNumber ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Emergency contact number</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="number"
                    {...register("EmergencyContactNumber")}
                    placeholder={
                      isTooltipVisible && errors.EmergencyContactNumber
                        ? errors.EmergencyContactNumber.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Emergency contact number</label>
                  <input
                    type="number"
                    {...register("EmergencyContactNumber")}
                  />
                </>
              )}

              {errors.password ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Password</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder={
                      isTooltipVisible && errors.password
                        ? errors.password.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Password</label>
                  <input type="password" {...register("password")} />
                </>
              )}

              {errors.confirmPassword ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Confirm password</label>
                    <AlertCircle
                      className="tooltip-trigger"
                      aria-label="More info"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleTooltipToggle}
                    />
                  </div>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder={
                      isTooltipVisible && errors.confirmPassword
                        ? errors.confirmPassword.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Confirm passoword</label>
                  <input type="password" {...register("confirmPassword")} />
                </>
              )}
            </div>
            <button className="primary-cta" type="button" onClick={nextStep}>
              <p>Next</p>
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h3>Step 2 of 3</h3>
            <div className="content">
              {errors.AddressLine1 ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Address Line 1</label>
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
                    {...register("AddressLine1")}
                    placeholder={
                      isTooltipVisible && errors.AddressLine1
                        ? errors.AddressLine1.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Address Line 1</label>
                  <input type="text" {...register("AddressLine1")} />
                </>
              )}

              <label>Address Line 2 (Optional)</label>
              <input type="text" {...register("AddressLine2")} />

              {errors.AddressCityTown ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>City or Town</label>
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
                    {...register("AddressCityTown")}
                    placeholder={
                      isTooltipVisible && errors.AddressCityTown
                        ? errors.AddressCityTown.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>City or Town</label>
                  <input type="text" {...register("AddressCityTown")} />
                </>
              )}

              {errors.AddressPostcode ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>Postcode</label>
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
                    {...register("AddressPostcode")}
                    placeholder={
                      isTooltipVisible && errors.AddressPostcode
                        ? errors.AddressPostcode.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>Postcode</label>
                  <input type="text" {...register("AddressPostcode")} />
                </>
              )}
            </div>
            <button type="button" className="primary-cta" onClick={nextStep}>
              <p>Next</p>
            </button>
            <button type="button" className="secondary-cta" onClick={prevStep}>
              <ArrowLeftCircle /> <p>Back</p>
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h3>Step 3 of 3</h3>
            <div className="content">
              {errors.FirstChildFirstName ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>First child first name</label>
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
                    {...register("FirstChildFirstName")}
                    placeholder={
                      isTooltipVisible && errors.FirstChildFirstName
                        ? errors.FirstChildFirstName.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>First child first name</label>
                  <input type="text" {...register("FirstChildFirstName")} />
                </>
              )}

              {errors.FirstChildLastName ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>First child last name</label>
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
                    {...register("FirstChildLastName")}
                    placeholder={
                      isTooltipVisible && errors.FirstChildLastName
                        ? errors.FirstChildLastName.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>First child last name</label>
                  <input type="text" {...register("FirstChildLastName")} />
                </>
              )}

              <ConfigProvider>
                <Controller
                  name="FirstChildDOB"
                  control={control}
                  render={({ field }) => (
                    <>
                      {errors.FirstChildDOB ? (
                        <div className="tooltip-container date">
                          <div>
                            <span className="error">*</span>
                            <label>First child DOB</label>
                            <AlertCircle className="tooltip-trigger" />
                          </div>

                          <CustomDatePicker
                            field={field}
                            errors={errors}
                            placeholder={"Select DOB"}
                          />
                        </div>
                      ) : (
                        <div className="tooltip-container date">
                          <label>First child DOB</label>

                          <CustomDatePicker
                            field={field}
                            errors={errors}
                            placeholder={"Select DOB"}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
              </ConfigProvider>

              {errors.FirstChildYearGroup ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>First child year group</label>
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
                    {...register("FirstChildYearGroup")}
                    placeholder={
                      isTooltipVisible && errors.FirstChildYearGroup
                        ? errors.FirstChildYearGroup.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>First child year group</label>
                  <input type="text" {...register("FirstChildYearGroup")} />
                </>
              )}

              {errors.FirstChildMedical ? (
                <>
                  <div className="tooltip-container">
                    <span className="error">*</span>
                    <label>First child medical details</label>
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
                    {...register("FirstChildMedical")}
                    placeholder={
                      isTooltipVisible && errors.FirstChildMedical
                        ? errors.FirstChildMedical.message
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <label>First child medical details</label>
                  <input type="text" {...register("FirstChildMedical")} />
                </>
              )}

              <div className="add-child">
                <button
                  className="secondary-cta"
                  type="button"
                  disabled={childCount === 2}
                  onClick={addChild}
                  style={childCount === 2 ? { display: "none" } : {}}
                >
                  <p>Add Another Child</p>
                </button>
                <button
                  type="button"
                  disabled={childCount === 1}
                  onClick={removeChild}
                  className="secondary-cta"
                  style={childCount === 1 ? { display: "none" } : {}}
                >
                  <p>Remove Child</p>
                </button>
              </div>
              {childCount === 2 && (
                <>
                  <label>Second child first name</label>
                  <input type="text" {...register("SecondChildFirstName")} />
                  <label>Second child last name</label>
                  <input type="text" {...register("SecondChildLastName")} />

                  <ConfigProvider>
                    <Controller
                      name="SecondChildDOB"
                      control={control}
                      render={({ field }) => (
                        <>
                          <div className="tooltip-container date">
                            <label>Second child DOB</label>

                            <CustomDatePicker
                              errors={errors}
                              field={field}
                              placeholder="Select DOB"
                            />
                          </div>
                        </>
                      )}
                    />
                  </ConfigProvider>
                  <label>Second child year group</label>

                  <input type="text" {...register("SecondChildYearGroup")} />

                  <label>Second child medical</label>

                  <input type="text" {...register("SecondChildMedical")} />
                </>
              )}
            </div>
            <ButtonLoad
              isSubmittingText="Registering..."
              isSubmitSuccessfulText="Registration successful"
              defaultText="Register"
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
              disabled={isSubmitting}
            />
            <button type="button" className="secondary-cta" onClick={prevStep}>
              <ArrowLeftCircle /> <p>Back</p>
            </button>

            {errors.root && (
              <div className="form-container-form error">
                <p>{errors.root.message}</p>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default Registration;
