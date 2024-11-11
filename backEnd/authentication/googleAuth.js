const googleAuthRouter = require('express').Router();
const User = require('../models/user');
const dotenv = require("dotenv") 
dotenv.config();


googleAuthRouter.post('/googleLogin', async (req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const phone = "none";
    const password = "googleAuth";
    const profilePicture = req.body.profilePicture;
    const user = await User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        profilePicture: profilePicture
    });

    const emailCheck = await User.findOne({email: email})
    console.log(emailCheck);
    if((!(await User.findOne({email: email})))){
        try{
            await user.save();
            console.log("Google Database save successful")}
        catch(error){
            console.log(error);
        }
    }
    res.json(user);
})

module.exports = googleAuthRouter;