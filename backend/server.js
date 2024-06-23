const express = require('express');
const mongoose = require('mongoose');
const User = require('./userModel');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true 
}));

mongoose.connect('mongodb://127.0.0.1:27017/shiftChange', {})
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Error connecting to database:', err));

// Register route
app.post('/api/register', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user); 
  } catch (error) {
    res.status(400).json({ message: 'Fehler bei der Registrierung', error: error.message }); 
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Benutzer nicht gefunden' }); 
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Falsches Passwort' });
  }

  res.status(200).json({ message: 'Login erfolgreich' }); 
});

app.listen(3000, () => console.log('Server is running on port 3000'));