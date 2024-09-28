require('./models/dataBase')


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors()); 
app.use(express.json()); 

const User = require('./models/user');


app.post('/signUp', async (req,res) => {
    try {

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
    console.log(req.body)
    console.log(firstNameinp);

    
    if(User.findOne({email: emailinp})){
        throw new Error("Email already exists");
        console.log("THROW ERROR BRO")
    }

    await user.save();
    res.json(user)

    }
    catch(error) {
        if(error){
            console.log( "Duplicate Email error");
            res.status(500).json({ message: 'Email already exists' });
        }
    }
})

app.post('/login', async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
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


app.get('/', (req,res) => {
    res.send("Hello World!"); 
})

app.listen(port, () => {//http://localhost:8000
    try {
        console.log("Port is listening :)");
    } catch(e) {
        console.log("Port is not listening :(")
    }
})




//mongoPassword: JIOglWWCF4QRT3y4

