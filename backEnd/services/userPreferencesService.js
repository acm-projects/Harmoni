const LoginInfo = require('../models/loginInfo');

const setIgnoreCalendars = async (email, ignoreCalendars) => {
  const user = await LoginInfo.findOneAndUpdate(
    { email },
    { ignoreCalendars },
    { new: true, upsert: true }
  );
  return user.ignoreCalendars;
};

const setAssignmentBuffer = async (email, assignmentBuffer) => {
  const user = await LoginInfo.findOneAndUpdate(
    { email },
    { assignmentBuffer },
    { new: true, upsert: true }
  );
  return user.assignmentBuffer;
};

const setExamBuffer = async (email, examBuffer) => {
  const user = await LoginInfo.findOneAndUpdate(
    { email },
    { examBuffer },
    { new: true, upsert: true }
  );
  return user.examBuffer;
};

const getUserPreferences = async (email) => {
  const user = await LoginInfo.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  return {
    ignoreCalendars: user.ignoreCalendars,
    assignmentBuffer: user.assignmentBuffer,
    examBuffer: user.examBuffer
  };
};

module.exports = {
  setIgnoreCalendars,
  setAssignmentBuffer,
  setExamBuffer,
  getUserPreferences
};