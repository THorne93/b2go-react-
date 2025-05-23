import React from 'react';

function Header() {
  return (
    <header style={{ 
      backgroundColor: '#282c34', 
      padding: '1rem', 
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1>My Homepage</h1>
    </header>
  );
}

export default Header;
