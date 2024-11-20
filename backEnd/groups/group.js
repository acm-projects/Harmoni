const express = require('express');
const mongoose = require('mongoose');

const groupRouter = express.Router();


// Create the Group model
const Group = require('../models/group');
const User = require('../models/user');
const group = require('../models/group');

// POST route to create a new group
groupRouter.post('/createGroup', async (req, res) => {
    const name = req.body.groupName;
    const memberNames = req.body.members;

    const existingGroup = await Group.findOne({ groupName: name });
    const members = await User.find({ name: { $in: memberNames } });

    if (existingGroup) {
        return res.status(500).json({ error: 'Group name already exists' });
    } else if (members.length !== memberNames.length) {
        return res.status(500).json({ error: 'Some members don\'t exist' });
    }

    try {
        const memberEmails = members.map(member => member.email);
        const newGroup = new Group({ groupName: name, memberEmails: memberEmails });
        await newGroup.save();
        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create group' });
    }
});

// GET route to fetch groups containing a specific member
groupRouter.get('/getGroups', async (req, res) => {
    const memberName = req.query.name;
    try {
        const user = await User.findOne({ name: memberName });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const memberEmail = user.email;
        const groups = await Group.find({ memberEmails: memberEmail });
        console.log(groups)
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

groupRouter.get('/getEmails', async (req, res) => {
    const groupName = req.query.groupName;
    console.log("CALLING GETEMAILS " + groupName);

    try {
        const group = await Group.findOne({ groupName: groupName });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        const memberEmails = group.memberEmails;
        // res.json(memberEmails);
        res.status(200).json({ memberEmails: memberEmails });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch member emails' });
    }
});

groupRouter.post('/leaveGroup', async (req, res) => {
    const groupName = req.body.groupName;
    const memberName = req.body.memberName;

    try {
        const user = await User.findOne({ name: memberName });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const memberEmail = user.email;

        await Group.updateOne({ groupName: groupName }, { $pull: { memberEmails: memberEmail } });

        const result = await Group.aggregate([
            {
              $project: {
                groupName: groupName,
                memberSize: { $size: "$memberEmails" }
              }
            }
        ]);

        if (result[0].memberSize == 0) {
            await Group.deleteOne({ groupName: groupName });
        }

        res.status(200).json({ message: 'Group left successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to leave group' });
    }
});

module.exports = groupRouter;