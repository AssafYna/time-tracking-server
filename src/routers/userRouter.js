import express from 'express';
import User from '../models/userModel.js';
import { userAuth } from '../middleware/auth.js';

const router = new express.Router();

//// Login & Logout ////

// LogIn
router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// LogOut
router.post('/user/logout', userAuth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send('Logout successfully');
  } catch (err) {
    res.status(500).send();
  }
});

export default router;
