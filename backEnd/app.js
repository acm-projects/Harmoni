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
    // const user = await User({
    //     firstName: "John",
    //     lastName: "Doe",
    //     email: "John@Doeil.com",
    //     password: "JohnDoePassword",
    // })
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
    console.log(req.body)
    console.log(firstNameinp);
    
    await user.save();
    res.json(user)
    }
    catch(error) {
        if(error)
            console.log( error + "Email already exists");
    }
})

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

