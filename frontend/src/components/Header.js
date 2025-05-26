import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);          // <-- update React state here
        setDropdownOpen(false);
        setEmail('');
        setPassword('');

      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };


  return (
    <header
      style={{
        backgroundColor: 'white',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid black',
        color: 'black',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {user && <h1 style={{ margin: 0, color: 'black' }}>Good morning, {`${user.name} ${user.surname}`}</h1>}

      <div style={{ position: 'relative', marginLeft: 'auto' }} ref={dropdownRef}>

        {user ? (
          <button
            style={{
              background: 'none',
              border: '1px solid black',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              background: 'none',
              border: '1px solid black',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            Login ▼
          </button>
        )}


        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              backgroundColor: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              padding: '1rem',
              borderRadius: '4px',
              width: '250px',
              zIndex: 200,
            }}
          >
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.4rem' }}
                />
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.4rem' }}
                />
              </div>
              {error && (
                <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>
              )}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
