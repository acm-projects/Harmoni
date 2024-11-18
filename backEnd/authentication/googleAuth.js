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
        {$set: {googleAuthSchema: {
            accessToken: accessToken, 
            refreshToken: "1//0fxRwK5T_TXJpCgYIARAAGA8SNwF-L9Ir3n2bfy6n17Qu7rBjqI-xatyGEhql-dP4z8OvtVIpElz3nj6UXgJMfCCwDzdqjIDCzRI",
        
        }}},
    )

    console.log(result)
    res.json(user);
})

module.exports = googleAuthRouter;