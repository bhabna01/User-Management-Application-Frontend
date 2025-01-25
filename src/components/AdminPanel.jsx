
import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import UserTable from './UserTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    toast.success('You have been logged out.'); // Show a success message
    navigate('/'); // Redirect to the login page
  };

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No token found. Please log in.');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error('Your account is blocked. Please contact the administrator.');
          localStorage.removeItem('token'); // Clear the token
          navigate('/'); // Redirect to login page
        } else if (error.response && error.response.status === 401) {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/'); // Redirect to login page
        } else {
          toast.error(error.response?.data?.error || 'An error occurred');
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  // Handle blocking/unblocking users
  const handleBlockUnblock = async (action) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please log in.');
      navigate('/');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/users/block',
        { userIds: selectedUsers, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the UI
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: action === 'block' ? 'blocked' : 'active' }
            : user
        )
      );

      // Check if the current user blocked themselves
      const currentUserEmail = jwtDecode(token).email; // Get the current user's email
      const isBlockingSelf = users.some(
        (user) => selectedUsers.includes(user.id) && user.email === currentUserEmail
      );

      if (isBlockingSelf && action === 'block') {
        toast.warning('You have blocked yourself. You will be logged out.');
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to login page
      } else {
        toast.success(`Users ${action === 'block' ? 'blocked' : 'unblocked'} successfully.`);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('Your account is blocked. Please contact the administrator.');
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to login page
      } else if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/'); // Redirect to login page
      } else {
        toast.error(error.response?.data?.error || 'An error occurred');
      }
    }
  };

  // Handle deleting users
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please log in.');
      navigate('/');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/users/delete',
        { userIds: selectedUsers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the UI
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      toast.success('Users deleted successfully.');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('Your account is blocked. Please contact the administrator.');
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to login page
      } else if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/'); // Redirect to login page
      } else {
        toast.error(error.response?.data?.error || 'An error occurred');
      }
    }
  };

  return (
    
    <div className="container mt-5">
  {/* Heading and Logout button in a flex container */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>User Management</h2>
    {/* Logout button pushed to the right using ms-auto */}
    <button
      onClick={handleLogout}
      className="btn btn-danger"
      
    >
      Logout
    </button>
    
  </div>

  <Toolbar
    onBlock={() => handleBlockUnblock('block')}
    onUnblock={() => handleBlockUnblock('unblock')}
    onDelete={handleDelete}
  />
  <UserTable users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
  <Toaster />
</div>
  );
};

export default AdminPanel;