const express = require('express');
const mongoose = require('mongoose');

const groupRouter = express.Router();


// Create the Group model
const Group = require('../models/group');
const User = require('../models/user');
const group = require('../models/group');

// POST route to create a new group
groupRouter.post('/createGroup', async (req, res) => {
    const name = await req.body.groupName;
    const members = await req.body.members;
    console.log(name)

    const existingGroup = await Group.findOne({ groupName: name });
    const nonExistingMembers = await User.find({ name: { $in: members } });
    console.log(nonExistingMembers)
    if (existingGroup) {
        console.log("Group name already exists")
        return res.status(500).json({ error: 'Group name already exists' });
    }
    else if(nonExistingMembers.length != members.length){
        console.log("Some members don't exist")
        return res.status(500).json({ error: 'Member/members don\'t exist' });
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

// GET route to fetch groups containing a specific member
groupRouter.get('/getGroups', async (req, res) => {
    const memberName = req.query.name;

    try {
        const groups = await Group.find({ memberNames: memberName });
        res.json(groups);
    } catch (error) {
        console.error("Got an error" + error);
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

groupRouter.post('/leaveGroup', async (req, res) => {
    const groupName = req.body.groupName;
    const memberName = req.body.memberName;

    try {
        await Group.updateOne({ groupName: groupName }, { $pull: { memberNames: memberName } });
        console.log("Group left successfully")

        const result = await Group.aggregate([
            {
              $project: {
                groupName: groupName,
                memberSize: { $size: "$memberNames" }  // Use $size to count elements in memberNames array
              }
            }
          ]);
          
          if(result[0].memberSize == 0){
            await Group.deleteOne({ groupName: groupName });
          }
    }
    catch (error) {
        console.error("Got an error" + error);
        res.status(500).json({ error: 'Failed to leave group' });
    }

});
    

module.exports = groupRouter;