import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../utils/api";

const Register = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser(credentials);
      if (response.token) {
        login(response);
        navigate("/");
      } else {
        setError(response.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={credentials.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
      <p className="text-center mt-2">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
    </div>
  );
};

export default Register;
