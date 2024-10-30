const passport = require('passport');   
const User = require('../models/user');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {

    const {firstNameinp, lastNameinp, emailinp, passwordinp} = {firstNameinp: profile.displayName, lastNameinp: profile.displayName, emailinp: profile.emails[0].value, passwordinp: profile.id};

    const user = await User({
        firstName: firstNameinp,
        lastName: lastNameinp,
        email: emailinp,
        password: passwordinp
    });
    // console.log(req.body)
    // console.log(firstNameinp);
    const emailCheck = await User.findOne({email: emailinp})
    console.log(emailCheck);
    if((!(await User.findOne({email: emailinp})))){
        try{
            await user.save();
            console.log("Google Database save successful")}
        catch(error){
            console.log(error);
        }
        return;
    }
    console.log("Google login successful");

    return done(null, profile);
  }));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

