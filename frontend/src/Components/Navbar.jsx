import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate= useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/"><img
          src="https://freepngimg.com/download/blogging/4-2-blogging-picture.png"
          alt="Logo"
          height="30"
        /></Link>
      </div>
      <ul className="navbar__links">
        <li className="navbar__item">
          <Link to="/" className='naving'>
            <i className="fa-solid fa-house"></i> Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/about" className='naving'>
            <i className="fa-solid fa-address-card"></i> About
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/contact" className='naving'>
            <i className="fa-solid fa-address-book"></i> Contact
          </Link>
        </li>
        {!isLoggedIn && (
          <React.Fragment>
            <li className="navbar__item">
              <Link to="/login" className='naving'>
                <i className="fa-solid fa-right-to-bracket"></i> Login/Signup
              </Link>
            </li>
          </React.Fragment>
        )}
        {isLoggedIn && (
          <React.Fragment>
            <li className="navbar__item">
              <Link to="/profile" className='naving'>
                <i className="fa-solid fa-user"></i> Profile
              </Link>
            </li>
            <li className="navbar__item">
              <button onClick={handleLogout}><i class="fa-solid fa-right-to-bracket"></i> Logout</button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
