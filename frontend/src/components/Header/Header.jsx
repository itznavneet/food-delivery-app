import React from 'react'
import './Header.css'

const Header = () => {
  const handleViewMenu = () => {
    const menuElement = document.getElementById('explore-menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
