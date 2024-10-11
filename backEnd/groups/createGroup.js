const express = require('express');
const mongoose = require('mongoose');

const groupRouter = express.Router();


// Create the Group model
const Group = require('../models/group');

// POST route to create a new group
groupRouter.post('/createGroup', async (req, res) => {
    const name = await req.body.groupName;
    const members = await req.body.members;
    console.log(name)

    const existingGroup = await Group.findOne({ groupName: name });
    if (existingGroup) {
        console.log("Group name already exists")
        return res.status(500).json({ error: 'Group name already exists' });
    }
    console.log(req.body)
    try {
        const newGroup = new Group({ groupName: name, memberNames: members });
        await newGroup.save();
        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        console.error("Got an error" + error);
        res.status(500).json({ error: 'Failed to create group' });
    }
});

module.exports = groupRouter;