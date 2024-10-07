import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
      {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.admin}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;