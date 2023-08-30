import React, { useState } from 'react';
import Modal from './Modal';
import { BackendLink } from '../Link';
import { Link,useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BackendLink}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setModalMessage('Registered Successfully');
        setIsModalOpen(true);
        navigate('/login')
      } else {
        console.error(data.message); 
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
        <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
      <p>Already have an Account ? <span><Link to="/login">Login</Link></span></p>
    </div>
  );
};

export default SignUp;
