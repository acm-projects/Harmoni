const pollRouter = require('express').Router();
const Poll = require('../models/polls');
const Group = require('../models/group');
const dotenv = require("dotenv") 
dotenv.config();


// POST route to create a new poll
pollRouter.post('/createPoll', async (req, res) => {
    const question = await req.body.question;
    const options = await req.body.options;
    const groupName = await req.body.groupName;
    const votes = await req.body.votes;
    const group = await Group.findOne({ groupName: groupName });
    if (!group) {
        console.log("Group doesn't exist")
        return res.status(500).json({ error: 'Group doesn\'t exist' });
    }
    console.log(req.body)
    try {
        const newPoll = new Poll({ groupName: groupName, question: question, options: options, votes: votes });
        await newPoll.save();
        res.status(201).json({ message: 'Poll created successfully', poll: newPoll });
    } catch (error) {
        console.error("Got an error" + error);
        res.status(500).json({ error: 'Failed to create poll' });
    }
});