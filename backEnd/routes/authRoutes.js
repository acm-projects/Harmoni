const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const LoginInfo = require('../models/loginInfo');

// Initiate Google OAuth2 login
router.get('/google', (req, res) => {
  try {
    const authUrl = authService.generateAuthUrl();
    res.redirect(authUrl); // Redirect the user to Google's OAuth2 login page
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    res.status(500).send('Error initiating authentication');
  }
});

// Handle Google OAuth2 callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  try {
    // Exchange authorization code for tokens
    const tokens = await authService.getToken(code);

    res.send(
      `<h1>Authentication Successful</h1>
       <p>You can now close this window and return to the app.</p>`
    );
  } catch (error) {
    console.error('Error handling OAuth2 callback:', error);
    res.status(500).send('Error completing authentication');
  }
});

// Logout route to revoke tokens
router.post('/logout', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required to log out');
  }

  try {
    const user = await LoginInfo.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Revoke the user's token with Google
    const revokeUrl = `https://oauth2.googleapis.com/revoke?token=${user.googleAuth.access_token}`;
    await fetch(revokeUrl, { method: 'POST' });

    // Clear the tokens in the database
    user.googleAuth = {};
    await user.save();

    res.send('Logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).send('Error logging out');
  }
});

module.exports = router;
