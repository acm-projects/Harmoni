const authRouter = require('express').Router();
const User = require('../models/user');
const dotenv = require("dotenv") 
dotenv.config();




//This block of code handles Post requests for the signUp route
authRouter.post('/signUp', async (req,res) => {
    try {

    const {firstNameinp, lastNameinp, emailinp, passwordinp} = req.body;

    const user = await User({
        firstName: firstNameinp,
        lastName: lastNameinp,
        email: emailinp,
        password: passwordinp
    });
    console.log(req.body)
    console.log(firstNameinp);

    
    if(User.findOne({email: emailinp})){
        console.log("Duplicate Email")
        res.status(500).json({ message: "Email already exists" });
        return;
    }

    await user.save();
    res.json(user)

    }
    catch(error) {
        if(error){
            console.log( "Server Error: " + error);
            res.status(500).json({ error });
        }
    }
})

authRouter.post('/login', async (req,res) => {

    const {email, password} = req.body;
    console.log(req.body.email)
    try {
        const emailLogin = await User.findOne({email: email});
        console.log(emailLogin);
        if (!emailLogin) {
            return res.status(400).json({ message: 'Invalid email or password' });
          }
        
        const passwordLogin = await User.findOne({password: password});
        if (!passwordLogin) {
            return res.status(400).json({ message: 'Invalid email or password' });
          }
        res.json({ message: 'Login successful' });
    }
    catch{
        console.error("Error during login: " + error);
        res.status(500).json({ message: 'Internal server error' });
    }})









const passport = require('passport');   
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5173/TestHome",
    passReqToCallback   : true
},
(request, accessToken, refreshToken, profile, done) => {
    // try {
    //     console.log("IS THIS WORKING??????")
    //     // Check if user already exists in the database
    //     let user = await User.findOne({ googleId: profile.id });
        
    //     if (user) {
    //       // User already exists, pass the user to done
    //       return done(null, user);
    //     } else {
    //       // If the user doesn't exist, create a new user
    //       user = new User({
    //         googleId: profile.id,
    //         displayName: profile.displayName,
    //         firstName: profile.name.givenName,
    //         lastName: profile.name.familyName,
    //         email: profile.emails[0].value,
    //         image: profile.photos[0].value
    //       });
          
    //       // Save the user to the database
    //       await user.save();
          
    //       return done(null, user);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     return done(error, null);
    //   }
    console.log("IS THIS WORKING??????")
    }));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


module.exports = authRouter;

