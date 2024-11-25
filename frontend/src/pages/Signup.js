import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Signup.css";
import Navbar from "../shared/Navbar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState('')
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signup", {
        username,
        password,
        email,
        subscribe,
      });

      setMessage("Signup successful! Redirecting to login...");

      // Clear the form
      setUsername("");
      setPassword("");
      setEmail('');
      setSubscribe(false);

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar type={"default"} />
      <div className="SignupPage">
        <div className="SignupContainer">
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={subscribe}
            />
            <label>
            <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
             />
            Subscribe to our newsletter
            </label>
            <button type="submit">Sign Up</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
