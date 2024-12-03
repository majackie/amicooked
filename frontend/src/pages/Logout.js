import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');

        // Optionally, clear other user data here, like profile info, etc.

        // Redirect to the login or home page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
