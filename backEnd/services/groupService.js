const Group = require('../models/group');

const createGroup = async (groupName, memberNames) => {
  const group = new Group({
    groupName,
    memberNames
  });

  await group.save();
  return group;
};

const getGroup = async (groupId) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error('Group not found');
  }
  return group;
};

module.exports = {
  createGroup,
  getGroup
};