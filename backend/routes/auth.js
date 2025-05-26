const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require('../config');
const db = require('../db');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Invalid credentials' });
    }
    const user = results[0];
    const hash = user.password.replace(/^\$2y/, '$2a');
    const validPassword = await bcrypt.compare(password, hash);
    if (!validPassword) {
      return res.status(401).json({ mensaje: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.API_KEY_JWT,
      { expiresIn: '1h' }
    );
    res.json({ token, user: { id: user.id, role: user.role, name: user.name, surname: user.surname } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ mensaje: 'Server error' });
  }
});



module.exports = router;
