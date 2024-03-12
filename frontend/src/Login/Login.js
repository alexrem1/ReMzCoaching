import { Link } from "react-router-dom";
import useLogin from "../CustomHooks/useLogin";

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
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)} ref={inputRef}>
        <br />
        <input type="text" placeholder="Email..." {...register("Email")} />
        {errors.Email && <p>{errors.Email.message}</p>}

        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <p>Logging in...</p>
          ) : isSubmitSuccessful ? (
            <p>Logged in successfully</p>
          ) : (
            <p>Login</p>
          )}
        </button>

        <br />
        {errors.root && <p>{errors.root.message}</p>}
      </form>
      <Link to="/Register">Register</Link>
      <Link to="/forgot-password">Forgotten Password?</Link>
    </>
  );
}

export default Login;
