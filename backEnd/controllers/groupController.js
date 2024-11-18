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
    const group = await Group.fine({name: groupId});
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