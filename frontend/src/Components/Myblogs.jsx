import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackendLink } from '../Link';
import Modal from './Modal';
import EditBlog from './Editblog';
const ProfileSection = ({ blogs, setBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [editBlog, setEditBlog] = useState(null);
  const handleDelete = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User is not logged in or token is missing.');
      return;
    }
    try {
      const response = await fetch(`${BackendLink}/blogs/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setModalMessage('Deleted Successfully');
        setIsModalOpen(true);
        const updatedBlogs = blogs.filter((blog) => blog.id !== postId);
        setBlogs(updatedBlogs);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);

  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="profile-section">
      <h1>My Recent Blogs</h1>
      {blogs && blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <div key={blog.id} className='myblog'>
              {blog.title && <h2>{blog.title}</h2>}
              {blog.category && <h3>Category - {blog.category}</h3>}
              <p>Date : {formatDateTime(blog.createdAt)}</p>
              <div id='tobe'>
                <Link to={`/blogs/${blog.id}`}>Read More</Link>
                <div id='btns2'>
                  <button onClick={() => setEditBlog(blog)} className='edit'>Edit <i class="fa-solid fa-pen-to-square"></i></button>
                  <button onClick={() => handleDelete(blog.id)} className='delete'>Delete <i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
              {editBlog === blog && (
                <EditBlog
                  blog={blog}
                  onUpdate={(updatedBlog) => {
                    setEditBlog(null);
                    const updatedBlogs = blogs.map((b) =>
                      b.id === updatedBlog.id ? updatedBlog : b
                    );
                    setBlogs(updatedBlogs);
                    console.log(updatedBlogs)
                  }}
                  onCancel={() => setEditBlog(null)}
                />
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p id='not'>No blogs found for the user.</p>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};
export default ProfileSection;
