import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/login`, { 
                username: username, 
                password: password,
            });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("id", response.data.userid)
            alert("Login successful!");
        } catch (error) {
            alert("Login failed: " + error.response.data.msg);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
