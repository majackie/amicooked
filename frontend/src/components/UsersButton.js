import React from 'react';
import axios from 'axios'; // Use ES6 import for axios

function UsersButton() {  
    const handleCheck = async () => {
        try {
            // Await the axios GET request
            const response = await axios.get("http://127.0.0.1:5000/api/users");
            console.log('Response:', response.data); // Access the data property from the response
        } catch (error) {
            console.error('Error: ', error);
        }    
    }

    return (
        <div style={styles.wrapper}>
            <button style={styles.button} onClick={handleCheck}>
                Get Users
            </button>
        </div>
    );
}

const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '20px'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#d1d5db',
        border: '1px solid #ccc',
        cursor: 'pointer'
    }
}

export default UsersButton;
