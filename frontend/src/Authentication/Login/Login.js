import { Link } from "react-router-dom";
import useLogin from "../../CustomHooks/useLogin";
import ButtonLoad from "../../Components/ButtonLoad";
import "../../forms.css";
function Login() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
    inputRef,
  } = useLogin();

  return (
    <div className="form-container">
      <div>
        <form
          className="form-container-form"
          onSubmit={handleSubmit(onSubmit)}
          ref={inputRef}
        >
          <h1>Login</h1>
          <input type="text" placeholder="Email" {...register("Email")} />
          {errors.Email && <p className="error">{errors.Email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <ButtonLoad
            isSubmittingText="Logging in..."
            isSubmitSuccessfulText="Logged in successfully"
            defaultText="Login"
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
            disabled={isSubmitting}
          />

          {errors.root && <p className="error">{errors.root.message}</p>}
        </form>
      </div>
      <div className="links">
        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <p>
          New to QC Sports Coaching? <Link to="/register">Register today!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
