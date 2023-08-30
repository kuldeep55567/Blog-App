import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PostList from './Components/Homepage';
import BlogDetails from './Components/BlogDetails';
import Profile from './Components/Profile';
import About from './Components/About';
import ContactPage from './Components/Contact';
import Admin from './Components/Admin';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/blogs/:postId" element={<BlogDetails />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
