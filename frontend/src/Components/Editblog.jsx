import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { BackendLink } from '../Link';
const EditBlog = ({ blog, onUpdate,onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState({
    title: blog.title,
    content: blog.content,
  });
  useEffect(() => {
    setFormData({
      title: blog.title,
      content: blog.content,
    });
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User is not logged in or token is missing.');
      return;
    }
    try {
      const response = await fetch(`${BackendLink}/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        onUpdate(data.updatedPost); 
      } else {
        setModalMessage('Log in first');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="edit-blog-form">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div id='btns'>
        <button type="submit">Update <i className="fa-solid fa-arrow-up"></i></button>
        <button type="button" onClick={onCancel} id='cancel'>Cancel <i className="fa-solid fa-xmark"></i></button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default EditBlog;
