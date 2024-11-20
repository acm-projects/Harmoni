const Group = require('../models/group');

const createGroup = async (req, res) => {
  const { name, members } = req.body;

  try {
    const group = new Group({ name, members });
    await group.save();
    res.json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).send('Error creating group');
  }
};

const getGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.find({name: groupId});
    if (!group) {
      return res.status(404).send('Group not found');
    }
    res.json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    res.status(500).send('Error fetching group');
  }
};

module.exports = {
  createGroup,
  getGroup
};


/* Mathew's Group Controller Logic

const groupService = require('../services/groupService');

const createGroup = async (req, res) => {
  const { groupName, memberNames } = req.body;

  try {
    const group = await groupService.createGroup(groupName, memberNames);
    res.json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).send('Error creating group');
  }
};

const getGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await groupService.getGroup(groupId);
    res.json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    res.status(500).send('Error fetching group');
  }
};

module.exports = {
  createGroup,
  getGroup
};

*/