import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/dashboard" className="hover:text-gray-400 cursor-pointer">Dashboard</Link></li>
          {token ? (
            <li><button onClick={handleLogout} className="hover:text-gray-400 cursor-pointer">Logout</button></li>
          ) : (
            <li><Link to="/login" className="hover:text-gray-400 cursor-pointer">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
