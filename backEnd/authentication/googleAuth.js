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
    const accessToken = req.body.accessToken;
    const user = await User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        profilePicture: profilePicture,
        googleAuth: {
            accessToken: accessToken,
            refreshToken: ""
        }
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
    const result = User.updateOne(
        {email:email},
        {$set: {googleAuth: {accessToken: accessToken, refreshToken: ""}}},
    )

    console.log(result)
    res.json(user);
})

module.exports = googleAuthRouter;