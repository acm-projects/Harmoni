const { MongoClient } = require('mongodb'); 
const dotenv = require("dotenv") 


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;
dotenv.config(); 

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    try {
        console.log("Port is listening :)");
    } catch(e) {
        console.log("Port is not listening :(")
    }
})

//mongoPassword: JIOglWWCF4QRT3y4

async function runMongo(){
    const MONGO_URI = "mongodb+srv://muhdaymanhaque:JIOglWWCF4QRT3y4@harmoni.etov0.mongodb.net/?retryWrites=true&w=majority&appName=Harmoni"
    const client = new MongoClient(MONGO_URI)
    
    try {
        await client.connect();
        console.log("Database is connnected! :) ");

        const dataBase = client.db('UserData');
        const collection = dataBase.collection('Credentials(PasswordEmail)');

        const pointer = collection.find({});

        pointer.forEach(document => {
            console.log(document);
        })
        


    } catch(e) {
        console.log("Database not connected :(");
    }

    
}



runMongo();