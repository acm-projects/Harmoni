const express = require('express'); //Ayman's Changes
const { MongoClient } = require('mongodb'); //Ayman's Changes
const dotenv = require("dotenv") //Ayman's Changes
dotenv.config(); //Ayman's Changes

const app = express()

app.use(cors()); //Ayman's Changes
app.use(express.json()); //Ayman's Changes

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(8000, () => {
    console.log('port is listening');
})

