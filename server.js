require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const router = require('./routes/index');
const app = express();
app.use(express.json());

app.use(router);
app.get('/private', authenticate, async (req, res) => {
  console.log('I am the user', req.user);
  return res.status(200).json({ message: 'Its Private Route' });
});

app.get('/public', (req, res) => {
  return res.status(200).json({ message: 'Its a Public Route' });
});

app.use((error, req, res, nest) => {
  console.log(error);
  const message = error.message ? error.message : 'Server Error Occars';
  const status = error.status ? error.status : 500;
  res.status(status).json({ message });
});

app.get('', (req, res) => {
  const obj = {
    name: 'Mafijul Alam',
    email: 'mafijulalam@gmail.com',
  };
  res.json(obj);
});
const PORT = process.env.PORT || 8000;

connectDB('mongodb://localhost:27017/attendance-sys')
  .then(() => {
    console.log('Database Cunnected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
