const authRouter = require('express').Router();
const User = require('../models/user');
const dotenv = require("dotenv") 
dotenv.config();




//This block of code handles Post requests for the signUp route
authRouter.post('/signUp', async (req,res) => {
    try {

    // const {firstNameinp, lastNameinp, emailinp, passwordinp} = req.body;
    const nameinp = req.body.name;
    const phoneinp = req.body.phone;
    const emailinp = req.body.email;
    const passwordinp = req.body.password;

    const user = await User({
        name: nameinp,
        phone: phoneinp,
        email: emailinp,
        password: passwordinp
    });
    console.log(req.body)
    console.log("email.inp " + emailinp);
    // await User.findOne({email: emailinp})
    if(await User.findOne({email: emailinp})){
        console.log("Duplicate Email")
        res.status(400).json({ message: "Email already exists" });
        return;
    }

    await user.save();
    res.json(user)

    }
    catch(error) {
        if(error){
            console.log( "Server Error: " + error);
            res.status(500).json();
        }
    }
})

authRouter.post('/login', async (req,res) => {

    const {email, password} = req.body;
    console.log("req.body.email " + email)
    try {
        const emailLogin = await User.findOne({email: email});
        if (!emailLogin) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        
        const passwordLogin = await User.findOne({password: password});
        if (!passwordLogin) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        console.log(emailLogin);
        const user = await User.find(emailLogin);  
        res.json(user);
    }
    catch{
        console.error("Error during login: " + error);
        res.status(500).json({ message: 'Internal server error' });
    }})








module.exports = authRouter;

