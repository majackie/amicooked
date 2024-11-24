import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

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

            // Redirect to login page after a short delay (2 seconds)
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
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
