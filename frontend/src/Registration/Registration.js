import { Link } from "react-router-dom";
import useRegistration from "../CustomHooks/useRegistration";
import { ConfigProvider, DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

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
    setPermission,
    setPupilPremium,
    inputRef,
  } = useRegistration();

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration form</h1>
        {step === 1 && (
          <>
            <h1>Carer information</h1>
            <div>
              <label>First name:</label>
              <input
                type="text"
                placeholder="Carer First Name..."
                {...register("CarerFirstName")}
              />
              {errors.CarerFirstName && (
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              )}
            </div>
            <input
              type="text"
              placeholder="Carer Last Name..."
              {...register("CarerLastName")}
            />
            {errors.CarerLastName && <p>{errors.CarerLastName.message}</p>}
            <input
              type="text"
              placeholder="Email..."
              {...register("Email")}
              name="Email"
            />
            {errors.Email && <p>{errors.Email.message}</p>}

            <input
              type="number"
              placeholder="Contact Number..."
              {...register("ContactNumber")}
            />
            <br />
            {errors.ContactNumber && <p>{errors.ContactNumber.message}</p>}
            <input
              type="number"
              placeholder="Emergency Contact Number..."
              {...register("EmergencyContactNumber")}
            />
            <br />
            {errors.EmergencyContactNumber && (
              <p>{errors.EmergencyContactNumber.message}</p>
            )}

            <input
              type="password"
              placeholder="Password..."
              {...register("password")}
            />
            <br />
            {errors.password && <p>{errors.password.message}</p>}

            <input
              type="password"
              placeholder="Confirm Password..."
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p>{errors.confirmPassword.message}</p>
            ) : (
              <br />
            )}
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h1>Children Details</h1>
            <input
              type="text"
              placeholder="First Child First Name..."
              {...register("FirstChildFirstName")}
            />
            {errors.FirstChildFirstName && (
              <p>{errors.FirstChildFirstName.message}</p>
            )}
            <input
              type="text"
              placeholder="First Child Last Name..."
              {...register("FirstChildLastName")}
            />
            {errors.FirstChildLastName && (
              <p>{errors.FirstChildLastName.message}</p>
            )}

            <ConfigProvider>
              <Controller
                name="FirstChildDOB"
                control={control}
                render={({ field }) => (
                  <>
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
                      value={field.value ? dayjs(field.value) : null}
                      placeholder="Select First Child's DOB"
                    />
                    {errors.FirstChildDOB ? (
                      <p style={{ color: "red" }}>
                        {errors.FirstChildDOB.message}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </ConfigProvider>

            <input
              type="text"
              placeholder="First Child Year Group..."
              {...register("FirstChildYearGroup")}
            />
            {errors.FirstChildYearGroup && (
              <p>{errors.FirstChildYearGroup.message}</p>
            )}
            <input
              type="text"
              placeholder="First Child Medical Info"
              {...register("FirstChildMedical")}
            />
            {errors.FirstChildMedical && (
              <p>{errors.FirstChildMedical.message}</p>
            )}
            <br />
            <button
              type="button"
              disabled={childCount === 2}
              onClick={addChild}
            >
              Add Another Child
            </button>
            <button
              type="button"
              disabled={childCount === 1}
              onClick={removeChild}
            >
              Remove Child
            </button>

            {childCount === 2 && (
              <div ref={inputRef}>
                <input
                  type="text"
                  placeholder="Second Child First Name..."
                  {...register("SecondChildFirstName")}
                />
                <input
                  type="text"
                  placeholder="Second Child Last Name..."
                  {...register("SecondChildLastName")}
                />

                <ConfigProvider>
                  <Controller
                    name="SecondChildDOB"
                    control={control}
                    render={({ field }) => (
                      <>
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
                          value={field.value ? dayjs(field.value) : null}
                          placeholder="Select Second Child's DOB"
                        />
                      </>
                    )}
                  />
                </ConfigProvider>
                <input
                  type="text"
                  placeholder="Second Child Year Group..."
                  {...register("SecondChildYearGroup")}
                />

                <input
                  type="text"
                  placeholder="Second Child Medical Info"
                  {...register("SecondChildMedical")}
                />
              </div>
            )}
            <br />
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h1>Permissions</h1>
            <div>
              {/* Permission */}
              <label htmlFor="Permission">Permission:</label>
              <Controller
                name="Permission"
                control={control}
                render={({ field }) => (
                  <input
                    id="Permission"
                    type="checkbox"
                    {...field}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      field.onChange(newValue);
                      setPermission(newValue);
                    }}
                  />
                )}
              />
            </div>
            <div>
              {/* PupilPremium */}
              <label htmlFor="PupilPremium">Pupil Premium:</label>
              <Controller
                name="PupilPremium"
                control={control}
                render={({ field }) => (
                  <input
                    id="PupilPremium"
                    type="checkbox"
                    {...field}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      field.onChange(newValue);
                      setPupilPremium(newValue);
                    }}
                  />
                )}
              />
            </div>
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button
              className="primary-cta"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <p>Registering</p>
              ) : isSubmitSuccessful ? (
                <p>Registration successful</p>
              ) : (
                <p>Register</p>
              )}
            </button>
            {errors.root && <p>{errors.root.message}</p>}
          </>
        )}
      </form>

      <Link to="/login">Login</Link>
    </>
  );
}

export default Registration;
