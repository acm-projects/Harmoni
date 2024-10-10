const authRouter = require('express').Router();
const User = require('../models/user');
const dotenv = require("dotenv") 
dotenv.config();




//This block of code handles Post requests for the signUp route
authRouter.post('/signUp', async (req,res) => {
    try {

    // const {firstNameinp, lastNameinp, emailinp, passwordinp} = req.body;
    const firstNameinp = req.body.firstName;
    const lastNameinp = req.body.lastName;
    const emailinp = req.body.email;
    const passwordinp = req.body.password;

    const user = await User({
        firstName: firstNameinp,
        lastName: lastNameinp,
        email: emailinp,
        password: passwordinp
    });
    console.log(req.body.email)
    console.log("email.inp " + emailinp);
    // await User.findOne({email: emailinp})
    if(await User.findOne({email: emailinp})){
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
    console.log("req.body.email " + email)
    try {
        const emailLogin = await User.findOne({email: email});
        console.log(emailLogin);
        if (!emailLogin) {
            return res.status(400).json({ message: 'Invalid email' });
          }
        
        const passwordLogin = await User.findOne({password: password});
        if (!passwordLogin) {
            return res.status(400).json({ message: 'Invalid password' });
          }
        res.json({ message: 'Login successful' });
    }
    catch{
        console.error("Error during login: " + error);
        res.status(500).json({ message: 'Internal server error' });
    }})








module.exports = authRouter;

