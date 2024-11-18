const groupService = require('../services/groupService');

const createGroup = async (req, res) => {
  const { name, members } = req.body;

  try {
    const group = await groupService.createGroup(name, members);
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