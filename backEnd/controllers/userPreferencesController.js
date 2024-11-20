const userPreferencesService = require('../services/userPreferencesService');

const setIgnoreCalendars = async (req, res) => {
  const { email, ignoreCalendars } = req.body;

  try {
    const updatedIgnoreCalendars = await userPreferencesService.setIgnoreCalendars(email, ignoreCalendars);
    res.json({ ignoreCalendars: updatedIgnoreCalendars });
  } catch (error) {
    console.error('Error setting ignore calendars:', error);
    res.status(500).send('Error setting ignore calendars');
  }
};

const setAssignmentBuffer = async (req, res) => {
  const { email, assignmentBuffer } = req.body;

  try {
    const updatedAssignmentBuffer = await userPreferencesService.setAssignmentBuffer(email, assignmentBuffer);
    res.json({ assignmentBuffer: updatedAssignmentBuffer });
  } catch (error) {
    console.error('Error setting assignment buffer:', error);
    res.status(500).send('Error setting assignment buffer');
  }
};

const setExamBuffer = async (req, res) => {
  const { email, examBuffer } = req.body;

  try {
    const updatedExamBuffer = await userPreferencesService.setExamBuffer(email, examBuffer);
    res.json({ examBuffer: updatedExamBuffer });
  } catch (error) {
    console.error('Error setting exam buffer:', error);
    res.status(500).send('Error setting exam buffer');
  }
};

const getUserPreferences = async (req, res) => {
  const { email } = req.params;

  try {
    const preferences = await userPreferencesService.getUserPreferences(email);
    res.json(preferences);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).send('Error fetching user preferences');
  }
};

module.exports = {
  setIgnoreCalendars,
  setAssignmentBuffer,
  setExamBuffer,
  getUserPreferences
};