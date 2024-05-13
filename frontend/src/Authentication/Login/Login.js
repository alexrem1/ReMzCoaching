import { Link } from "react-router-dom";
import useLogin from "../../CustomHooks/useLogin";
import ButtonLoad from "../../Components/ButtonLoad";
import "../../forms.css";
import useUtilities from "../../CustomHooks/useUtilities";
import { Eye, EyeOff } from "lucide-react";
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

  const { togglePasswordVisibility1, passwordInput, showPassword1 } =
    useUtilities();

  return (
    <div className="form-container">
      <form
        className="form-container-form"
        onSubmit={handleSubmit(onSubmit)}
        ref={inputRef}
      >
        <h1>Login</h1>
        <input type="text" placeholder="Email" {...register("Email")} />
        {errors.Email && <p className="error">{errors.Email.message}</p>}

        <div ref={passwordInput} className="password-input-wrapper">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <span onClick={togglePasswordVisibility1}>
            {showPassword1 ? <Eye /> : <EyeOff />}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}
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
      <div className="links">
        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <p>
          New to ReMz Coaching? <Link to="/register">Register today!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
