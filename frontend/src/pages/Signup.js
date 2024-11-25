import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/signup', {
                username,
                password,
            });

            setMessage('Signup successful! Redirecting to login...');

            // Clear the form
            setUsername('');
            setPassword('');

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data.msg) {
                setMessage(error.response.data.msg);
            } else {
                setMessage('Signup failed. Please try again.');
            }
        }
    };

    return (
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
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Signup;
