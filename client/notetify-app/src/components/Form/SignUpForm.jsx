import { useState } from "react";
import PasswordInput from "../Input/PasswordInput";
import { validationEmail } from "../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function SignUpForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!username) {
      setError("Please enter your username.");
      return;
    }

    if (!validationEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/createAccount", {
        fullName: username,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("an unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="flex justify-center items-center mt-28">
      <div className="w-96 border rounded-xl px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h1 className="font-bold text-2xl mb-7">Sign Up</h1>

          <input
            type="text"
            placeholder="Username"
            className="input-box"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />

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
            Create Account
          </button>

          <p className="text-sm text-center mt-4 ">
            Already have an account ? |{" "}
            <Link to="/login" className="font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SignUpForm;
