const { google } = require('googleapis');
const LoginInfo = require('../models/loginInfo');
const dotenv = require('dotenv');
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_ID,
  process.env.REDIRECT
);

const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'profile'
    ]
  });
};

const getToken = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens received:', tokens);

    // Get the user's email from Google People API
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const me = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names'
    });

    const email = me.data.emailAddresses[0].value;
    const firstName = me.data.names[0].givenName;
    const lastName = me.data.names[0].familyName;

    // Save tokens and user info to the database
    const user = await LoginInfo.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        googleAuth: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          scope: tokens.scope,
          token_type: tokens.token_type,
          expiry_date: tokens.expiry_date
        }
      },
      { new: true, upsert: true }
    );

    console.log('User updated with tokens:', user);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw new Error('Error getting tokens');
  }
};

const checkAndRefreshToken = async (user) => {
  try {
    oauth2Client.setCredentials({
      access_token: user.googleAuth.access_token,
      refresh_token: user.googleAuth.refresh_token,
      scope: user.googleAuth.scope,
      token_type: user.googleAuth.token_type,
      expiry_date: user.googleAuth.expiry_date
    });

    const tokens = oauth2Client.credentials;
    if (!tokens || !tokens.expiry_date || tokens.expiry_date <= Date.now()) {
      console.log('Token expired or not available, refreshing...');
      const newTokens = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(newTokens.credentials);
      console.log('Token refreshed:', newTokens.credentials);

      // Update the user's tokens in the database
      user.googleAuth.access_token = newTokens.credentials.access_token;
      user.googleAuth.expiry_date = newTokens.credentials.expiry_date;
      await user.save();
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Error refreshing token');
  }
};

module.exports = {
  oauth2Client, // Ensure oauth2Client is exported
  generateAuthUrl,
  getToken,
  checkAndRefreshToken
};