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
    const user = await User({
        firstName: "John",
        lastName: "Doe",
        email: "John@Doemail.com",
        password: "JohnDoePassword",
    })
    await user.save();
    res.json(user);
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

