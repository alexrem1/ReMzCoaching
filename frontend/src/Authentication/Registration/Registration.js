import useRegistration from "../../CustomHooks/useRegistration";
import { ConfigProvider } from "antd";
import { Controller } from "react-hook-form";
import { ArrowLeftCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
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
    disabledDOB,
  } = useRegistration();

  const {
    togglePasswordVisibility1,
    passwordInput,
    togglePasswordVisibility2,
    confirmPasswordInput,
    showPassword1,
    showPassword2,
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
              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.CarerFirstName ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>First name</label>
                  <AlertCircle
                    style={{
                      display: errors.CarerFirstName ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.CarerFirstName
                      ? errors.CarerFirstName.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.CarerFirstName
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("CarerFirstName")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.CarerLastName ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Last name</label>
                  <AlertCircle
                    style={{
                      display: errors.CarerLastName ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.CarerLastName ? errors.CarerLastName.message : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.CarerLastName
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("CarerLastName")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.Email ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Email</label>
                  <AlertCircle
                    style={{
                      display: errors.Email ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.Email ? errors.Email.message : null}
                  </label>
                </div>
                <input
                  name="Email"
                  style={{
                    borderBottom: errors.Email
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("Email")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.ContactNumber ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Contact number</label>
                  <AlertCircle
                    style={{
                      display: errors.ContactNumber ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.ContactNumber ? errors.ContactNumber.message : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.ContactNumber
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="number"
                  {...register("ContactNumber")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.EmergencyContactNumber ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Emergency contact number</label>
                  <AlertCircle
                    style={{
                      display: errors.EmergencyContactNumber ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.EmergencyContactNumber
                      ? errors.EmergencyContactNumber.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.EmergencyContactNumber
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="number"
                  {...register("EmergencyContactNumber")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.password ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Password</label>
                  <AlertCircle
                    style={{
                      display: errors.password ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>
                <div>
                  <label style={{ padding: "0" }}>
                    {errors.password ? errors.password.message : null}
                  </label>
                </div>
                <div ref={passwordInput} className="password-input-wrapper">
                  <input
                    style={{
                      borderBottom: errors.password
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                    type="password"
                    {...register("password")}
                  />
                  <span onClick={togglePasswordVisibility1}>
                    {showPassword1 ? <Eye /> : <EyeOff />}
                  </span>
                </div>
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.confirmPassword ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Confirm password</label>
                  <AlertCircle
                    style={{
                      display: errors.confirmPassword ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.confirmPassword
                      ? errors.confirmPassword.message
                      : null}
                  </label>
                </div>
                <div
                  className="password-input-wrapper"
                  ref={confirmPasswordInput}
                >
                  <input
                    style={{
                      borderBottom: errors.confirmPassword
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                    type="password"
                    {...register("confirmPassword")}
                  />
                  <span onClick={togglePasswordVisibility2}>
                    {showPassword2 ? <Eye /> : <EyeOff />}
                  </span>
                </div>
              </>
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
              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.AddressLine1 ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Address Line 1</label>
                  <AlertCircle
                    style={{
                      display: errors.AddressLine1 ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.AddressLine1 ? errors.AddressLine1.message : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.AddressLine1
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("AddressLine1")}
                />
              </>

              <label>Address Line 2 (Optional)</label>
              <input type="text" {...register("AddressLine2")} />

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.AddressCityTown ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>City or Town</label>
                  <AlertCircle
                    style={{
                      display: errors.AddressCityTown ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.AddressCityTown
                      ? errors.AddressCityTown.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.AddressCityTown
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("AddressCityTown")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.AddressPostcode ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>Postcode</label>
                  <AlertCircle
                    style={{
                      display: errors.AddressPostcode ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.AddressPostcode
                      ? errors.AddressPostcode.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.AddressPostcode
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("AddressPostcode")}
                />
              </>
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
              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.FirstChildFirstName ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>First child first name</label>
                  <AlertCircle
                    style={{
                      display: errors.FirstChildFirstName ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.FirstChildFirstName
                      ? errors.FirstChildFirstName.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.FirstChildFirstName
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("FirstChildFirstName")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.FirstChildLastName ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>First child last name</label>
                  <AlertCircle
                    style={{
                      display: errors.FirstChildLastName ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.FirstChildLastName
                      ? errors.FirstChildLastName.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.FirstChildLastName
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("FirstChildLastName")}
                />
              </>

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
                            disabledDate={disabledDOB}
                            placeholder={"Select DOB"}
                          />
                        </div>
                      ) : (
                        <div className="tooltip-container date">
                          <label>First child DOB</label>

                          <CustomDatePicker
                            field={field}
                            errors={errors}
                            disabledDate={disabledDOB}
                            placeholder={"Select DOB"}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
              </ConfigProvider>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.FirstChildYearGroup ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>First child year group</label>
                  <AlertCircle
                    style={{
                      display: errors.FirstChildYearGroup ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.FirstChildYearGroup
                      ? errors.FirstChildYearGroup.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.FirstChildYearGroup
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("FirstChildYearGroup")}
                />
              </>

              <>
                <div className="tooltip-container">
                  <span
                    className="error"
                    style={{
                      display: errors.FirstChildMedical ? "block" : "none",
                    }}
                  >
                    *
                  </span>
                  <label>First child medical details</label>
                  <AlertCircle
                    style={{
                      display: errors.FirstChildMedical ? "block" : "none",
                    }}
                    className="tooltip-trigger"
                    aria-label="More info"
                  />
                </div>

                <div>
                  <label style={{ padding: "0" }}>
                    {errors.FirstChildMedical
                      ? errors.FirstChildMedical.message
                      : null}
                  </label>
                </div>
                <input
                  style={{
                    borderBottom: errors.FirstChildMedical
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  type="text"
                  {...register("FirstChildMedical")}
                />
              </>

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
                              disabledDate={disabledDOB}
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
