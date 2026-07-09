import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Forgot Password</h1>

      <p>This feature will be implemented soon.</p>

      <Link to="/">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;