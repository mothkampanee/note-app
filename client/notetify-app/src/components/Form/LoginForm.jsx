import { Link } from "react-router-dom";
import PasswordInput from "../Input/PasswordInput";
import { useState } from "react";
import { validationEmail } from "../../utils/validation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validationEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // Login API Call
  };
  return (
    <section className="flex justify-center items-center mt-28">
      <div className="w-96 border rounded-xl px-7 py-10">
        <form onSubmit={handleLogin}>
          <h1 className="font-bold text-2xl mb-7">Login</h1>

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-sm text-center mt-4 ">
            Not registered yet ? |{" "}
            <Link to="/signup" className="font-medium underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
