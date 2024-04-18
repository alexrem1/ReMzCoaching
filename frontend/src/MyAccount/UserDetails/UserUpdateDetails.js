import { Controller } from "react-hook-form";
import { ConfigProvider, DatePicker } from "antd";
import useUpdateProfile from "../../CustomHooks/useUpdateProfile";
import dayjs from "dayjs";
import { AlertCircle, ArrowLeftCircle } from "lucide-react";
import ButtonLoad from "../../Components/ButtonLoad";
import CustomDatePicker from "../../Components/DatePickerWeekends";
import useUtilities from "../../CustomHooks/useUtilities";

function UserUpdateDetails() {
  const {
    navigate,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
    userDetails,
    step,
    nextStep,
    prevStep,
  } = useUpdateProfile();

  const {
    isTooltipVisible,
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipToggle,
  } = useUtilities();

  return (
    <>
      {userDetails.map((details) => {
        return (
          <div className="form-container" key={details.id}>
            <form
              className="form-container-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1>Update Details</h1>
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
                        <input
                          type="text"
                          {...register("CarerFirstName")}
                          defaultValue={details.CarerFirstName}
                          disabled={details.CarerFirstName}
                        />
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
                        <input
                          type="text"
                          {...register("CarerLastName")}
                          defaultValue={details.CarerLastName}
                          disabled={details.CarerLastName}
                        />
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
                        <input
                          type="text"
                          {...register("Email")}
                          name="Email"
                          defaultValue={details.Email}
                        />
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
                        <input
                          type="number"
                          {...register("ContactNumber")}
                          defaultValue={details.ContactNumber}
                        />
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
                          defaultValue={details.EmergencyContactNumber}
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
                        <label>Confirm password</label>
                        <input
                          type="password"
                          {...register("confirmPassword")}
                        />
                      </>
                    )}
                  </div>
                  <button
                    className="primary-cta"
                    type="button"
                    onClick={nextStep}
                  >
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
                        <input
                          type="text"
                          {...register("AddressLine1")}
                          defaultValue={details.AddressLine1}
                        />
                      </>
                    )}

                    <label>Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      {...register("AddressLine2")}
                      defaultValue={
                        details.AddressLine2 ? details.AddressLine2 : ""
                      }
                    />

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
                        <input
                          type="text"
                          {...register("AddressCityTown")}
                          defaultValue={details.AddressCityTown}
                        />
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
                        <input
                          type="text"
                          {...register("AddressPostcode")}
                          defaultValue={details.AddressPostcode}
                        />
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    className="primary-cta"
                    onClick={nextStep}
                  >
                    <p>Next</p>
                  </button>
                  <button
                    type="button"
                    className="secondary-cta"
                    onClick={prevStep}
                  >
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
                        <input
                          type="text"
                          {...register("FirstChildFirstName")}
                          defaultValue={details.FirstChildFirstName}
                        />
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
                        <input
                          type="text"
                          {...register("FirstChildLastName")}
                          defaultValue={details.FirstChildLastName}
                        />
                      </>
                    )}

                    <ConfigProvider>
                      <Controller
                        name="FirstChildDOB"
                        control={control}
                        defaultValue={
                          details.FirstChildDOB &&
                          dayjs(details.FirstChildDOB, "DD/MM/YYYY").format(
                            "YYYY-MM-DD"
                          )
                        }
                        render={({ field }) => (
                          <>
                            {errors.FirstChildDOB ? (
                              <div className="tooltip-container date">
                                <div>
                                  <span className="error">*</span>
                                  <label>First child DOB</label>
                                  <AlertCircle className="tooltip-trigger" />
                                </div>

                                <DatePicker
                                  ref={field.ref}
                                  name={field.name}
                                  onBlur={field.onBlur}
                                  onChange={(date) => {
                                    field.onChange(date ? dayjs(date) : null);
                                    console.log(
                                      date,
                                      dayjs(date),
                                      dayjs(date).format("DD/MM/YYYY")
                                    );
                                  }}
                                  format="DD/MM/YYYY"
                                  locale={{
                                    format: "DD/MM/YYYY",
                                    lang: { locale: "en-gb" },
                                  }} // Set locale to UK
                                  value={
                                    field.value ? dayjs(field.value) : null
                                  }
                                  placeholder="Select DOB"
                                />
                              </div>
                            ) : (
                              <div className="tooltip-container date">
                                <label>First child DOB</label>

                                <CustomDatePicker
                                  errors={errors}
                                  field={field}
                                  placeholder="First child DOB"
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
                        <input
                          type="text"
                          {...register("FirstChildYearGroup")}
                          defaultValue={details.FirstChildYearGroup}
                        />
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
                        <input
                          type="text"
                          {...register("FirstChildMedical")}
                          defaultValue={details.FirstChildMedical}
                        />
                      </>
                    )}

                    <>
                      <label>Second child first name</label>
                      <input
                        type="text"
                        {...register("SecondChildFirstName")}
                        defaultValue={
                          details.SecondChildFirstName
                            ? details.SecondChildFirstName
                            : ""
                        }
                      />
                      <label>Second child last name</label>
                      <input
                        type="text"
                        {...register("SecondChildLastName")}
                        defaultValue={
                          details.SecondChildLastName
                            ? details.SecondChildLastName
                            : ""
                        }
                      />

                      <ConfigProvider>
                        <Controller
                          name="SecondChildDOB"
                          defaultValue={
                            details.SecondChildDOB
                              ? dayjs(
                                  details.SecondChildDOB,
                                  "DD/MM/YYYY"
                                ).format("YYYY-MM-DD")
                              : undefined
                          }
                          control={control}
                          render={({ field }) => (
                            <>
                              <div className="tooltip-container date">
                                <label>Second child DOB</label>

                                <CustomDatePicker
                                  errors={errors}
                                  field={field}
                                  placeholder="Second child DOB"
                                />
                              </div>
                            </>
                          )}
                        />
                      </ConfigProvider>
                      <label>Second child year group</label>

                      <input
                        type="text"
                        {...register("SecondChildYearGroup")}
                        defaultValue={
                          details.SecondChildYearGroup
                            ? details.SecondChildYearGroup
                            : ""
                        }
                      />

                      <label>Second child medical</label>

                      <input
                        type="text"
                        {...register("SecondChildMedical")}
                        defaultValue={
                          details.SecondChildMedical
                            ? details.SecondChildMedical
                            : ""
                        }
                      />
                    </>
                  </div>
                  <ButtonLoad
                    isSubmittingText="Updating profile..."
                    isSubmitSuccessfulText="Update successful"
                    defaultText="Update profile"
                    isSubmitting={isSubmitting}
                    isSubmitSuccessful={isSubmitSuccessful}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="secondary-cta"
                    onClick={prevStep}
                  >
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
            <button
              type="button"
              className="secondary-cta"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <ArrowLeftCircle /> <p>Back to account</p>
            </button>
          </div>
        );
      })}
    </>
  );
}

export default UserUpdateDetails;
