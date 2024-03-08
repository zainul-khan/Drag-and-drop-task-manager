import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
   <nav className='navbar'>
    <p className='nav-logo'>Task Managar</p>
    <ul className='navbar-items'>
      <li>Task tracking made easy</li>
    </ul>
   </nav>
  );
}

export default Navbar;
