import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../utils/api";

const Login = () => {
//   const [count, setCount] = useState(0);
//   const [seconds, setSeconds] = useState(0);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//     setSeconds((prev) => prev + 1)
//     },1000);
//     return () => clearInterval(interval);
//   }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(credentials);
      if (response.token) {
        login(response); // Save user in context
        navigate("/dashboard"); // Redirect to dashboard after login
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Error logging in. Please check your credentials.");
    }
  };

  const guestLogin = async () => {
    const guestUser = { email: "guest@example.com", password: "guest123" };
    try {
      const response = await loginUser(guestUser);
      if (response.token) {
        login(response);
        navigate("/");
      } else {
        setError(response.message || "Guest login failed.");
      }
    } catch (err) {
      setError("Error logging in as guest.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      {/* {count}
      <button onClick={() => setCount(count + 1)}>Increse Count</button>
      <button onClick={() => setCount(count - 1)}>Decrease count</button>
      {seconds} */}
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <button
          onClick={guestLogin}
          className="w-full cursor-pointer bg-gray-500 text-white p-2 rounded"
        >
          Guest Login
        </button>
      </form>
      <p className="text-center mt-2">
        No account?
        <a href="/register" className="text-blue-500">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
