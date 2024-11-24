import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async () => {
        console.log("handleLogin")
        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/login`, { 
                username: username, 
                password: password,
            });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("id", response.data.userid)
            console.log("access token "+localStorage.getItem("token"))
            alert("Login successful!");

            // Redirect to user-dashboard after successful login
            navigate("/user-dashboard");
        } catch (error) {
            alert("Login failed: " + error.response?.data?.msg || "Something went wrong");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
