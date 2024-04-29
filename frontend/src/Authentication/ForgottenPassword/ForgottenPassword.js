import { Link } from "react-router-dom";
import ButtonLoad from "../../Components/ButtonLoad";
import useForgotPassword from "../../CustomHooks/useForgotPassword";

function ForgottenPassword() {
  const {
    inputRef,
    resetSuccess,
    onSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    isSubmitting,
  } = useForgotPassword();

  return (
    <div className="form-container">
      {!resetSuccess && (
        <>
          <form
            className="form-container-form"
            onSubmit={handleSubmit(onSubmit)}
            ref={inputRef}
          >
            <h1>Forgotten Password</h1>
            <input type="text" placeholder="Email..." {...register("Email")} />
            {errors.Email && <p className="error">{errors.Email.message}</p>}
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
          <div className="links">
            <p>
              <Link to="/login">Login</Link>
            </p>
            <p>
              New to ReMz Coaching? <Link to="/register">Register today!</Link>
            </p>
          </div>
        </>
      )}
      {resetSuccess && (
        <form className="form-container-form">
          <p>
            Please check your inbox or junk folders for password reset
            instructions.
          </p>
        </form>
      )}
    </div>
  );
}

export default ForgottenPassword;
