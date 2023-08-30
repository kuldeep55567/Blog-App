import React, { useState, useEffect } from 'react';
import { BackendLink } from '../Link';
import Modal from './Modal';
import '../Css/Admin.css';

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${BackendLink}/users`)
      .then(response => response.json())
      .then(data => {
        setTotalUsers(data.length);
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    fetch(`${BackendLink}/blogs`)
      .then(response => response.json())
      .then(data => {
        setTotalBlogs(data.length);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleChangeRole = (userId, newRole) => {
    const user = users.find(user => user.id === userId);

    fetch(`${BackendLink}/users/${userId}/change-role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ newRole }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setModalMessage(`${user.name}'s role set to ${newRole}`);
        setIsModalOpen(true);
      })
      .catch(error => {
        console.error('Error changing role:', error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div>
        <h3>Statistics</h3>
        <div className="tot">
          <p className="total">Total Users: {totalUsers}</p>
          <p className="total">Total Blogs Posted: {totalBlogs}</p>
        </div>
      </div>
      <div>
        <h3>Change User Role</h3>
        {users.map(user => (
          <div key={user.id} className="changefor">
            <p>{user.name}</p>
            <select onChange={e => handleChangeRole(user.id, e.target.value)}>
              <option value="reader">Reader</option>
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default AdminPanel;
