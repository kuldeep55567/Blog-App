import React, { useState, useEffect } from 'react';
import ProfileSection from './Myblogs';
import CreateBlog from './Createblog';
import { BackendLink } from '../Link';
const Profile = () => {
const [blogs, setBlogs] = useState([]);
const fetchUpdatedBlogs = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('User is not logged in or token is missing.');
    return;
  }
  fetch(`${BackendLink}/myblogs`, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setBlogs(data);
    })
    .catch((error) => {
      console.error('Error fetching blogs:', error);
    });
};
useEffect(() => {
  fetchUpdatedBlogs(); 
}, []);

  return (
    <div>
      <ProfileSection blogs={blogs} setBlogs={setBlogs}/>
      <CreateBlog setBlogs={fetchUpdatedBlogs} />
    </div>
  );
};

export default Profile;