const express = require('express');
const mongoose = require('mongoose');
const User = require('./userModel');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/shiftChange', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Error connecting to database:', err));

// Register route
app.post('/api/register', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Benutzer nicht gefunden');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).send('Falsches Passwort');
  }

  res.status(200).send('Login erfolgreich');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
