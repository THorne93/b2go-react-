const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const routes = require('./routes/routes');
const auth = require('./routes/auth');
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.use('/', routes); 
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});