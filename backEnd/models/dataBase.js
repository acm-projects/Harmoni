const dotenv = require("dotenv") 
dotenv.config(); 


const mongoose = require('mongoose');

// Connect to MongoDB

/* 

I'll just use my connection string for now 
- mathew
(async () => {
    try {
        await mongoose.connect(process.env.USER_URI);
        console.log('Connected to database :)');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
})();
*/













    

// async function runMongo(){
//     const client = new MongoClient(process.env.mongoURI);
    
//     try {
//         await client.connect();
//         console.log("Database is connnected! :) ");

//         const dataBase = client.db('UserData');
//         const collection = dataBase.collection('Credentials(PasswordEmail)');

//         const pointer = collection.find({});

//         pointer.forEach(document => {
//             console.log(document);
//         })
        


//     } catch(e) {
//         console.log("Database not connected :(");
//     }

    
// }



// runMongo();