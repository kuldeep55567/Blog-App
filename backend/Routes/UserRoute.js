const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');
const UserRouter = express.Router()
require("dotenv").config()

UserRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing up!' });
  }
});

UserRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({ message: 'Login successful!', token: token });
      } else {
        res.status(401).json({ message: 'Invalid password!' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in!' });
  }
});

module.exports = { UserRouter }