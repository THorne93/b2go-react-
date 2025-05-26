import React from 'react';
import Header from './components/Header';

function MainContent() {
  return (
    <main style={{  flex: 1 }}>
      <Header />
      <h2>Welcome!</h2>
      <p>This is your homepage content area. Add text, images, whatever you want here.</p>
    </main>
  );
}

export default MainContent;
