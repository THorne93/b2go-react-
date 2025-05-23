import React from 'react';

function Sidebar() {
  return (
    <nav style={{ width: '200px', backgroundColor: '#222', color: '#fff', height: '100vh', padding: '1rem' }}>
      <h2>Menu</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a  style={{ color: '#fff' }}>Home</a></li>
        <li><a  style={{ color: '#fff' }}>About</a></li>
        <li><a  style={{ color: '#fff' }}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
