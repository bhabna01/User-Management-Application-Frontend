import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import UserTable from './UserTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login'); // Redirect to login page
        } else {
          alert(error.response.data.error);
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleBlockUnblock = async (action) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/users/block', { userIds: selectedUsers, action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map(user => selectedUsers.includes(user.id) ? { ...user, status: action === 'block' ? 'blocked' : 'active' } : user));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login'); // Redirect to login page
      } else {
        alert(error.response.data.error);
      }
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/users/delete', { userIds: selectedUsers }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login'); // Redirect to login page
      } else {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <Toolbar onBlock={() => handleBlockUnblock('block')} onUnblock={() => handleBlockUnblock('unblock')} onDelete={handleDelete} />
      <UserTable users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
    </div>
  );
};

export default AdminPanel;