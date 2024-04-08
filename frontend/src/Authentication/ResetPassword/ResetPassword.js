import ButtonLoad from "../../Components/ButtonLoad";
import useResetPassword from "../../CustomHooks/useResetPassword";

function ResetPassword() {
  const {
    onSubmit,
    success,
    isSubmitSuccessful,
    isSubmitting,
    errors,
    register,
    handleSubmit,
    inputRef,
  } = useResetPassword();

  return (
    <div className="form-container">
      {!success && (
        <>
          <form
            className="form-container-form"
            onSubmit={handleSubmit(onSubmit)}
            ref={inputRef}
          >
            <h1>Reset Password</h1>
            <input
              type="password"
              placeholder="Password..."
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password..."
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}

            <ButtonLoad
              isSubmittingText="Resetting password..."
              isSubmitSuccessfulText="Reset password"
              defaultText="Reset password"
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
              disabled={isSubmitting}
            />

            {errors.root && <p className="error">{errors.root.message}</p>}
          </form>
        </>
      )}

      {success && (
        <form className="form-container-form">
          <p>
            Your password has been successfully reset. You will be redirected to
            the login page...
          </p>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
