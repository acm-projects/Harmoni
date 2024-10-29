const moment = require('moment-timezone');
const FreeTime = require('../../models/freeTime');
const { fetchEventsForMultipleUsers } = require('./fetchEvents');

const calculateFreeTimeForMultipleUsers = async (users, days) => {
  try {
    const allEvents = await fetchEventsForMultipleUsers(users, days);

    // Calculate common free time
    let freeTime = [];
    let currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0); // Start at the beginning of the day

    const assignmentKeywords = ["assignment", "homework", "worksheet"];
    const examKeywords = ["test", "midterm", "final", "exam"];

    allEvents.forEach(event => {
      const eventStart = new Date(event.start.dateTime || event.start.date); // Use UTC
      const eventSummary = event.summary.toLowerCase();
      const { assignmentBuffer, examBuffer } = event;

      // Check for assignment keywords
      if (assignmentKeywords.some(keyword => eventSummary.includes(keyword))) {
        const bufferStart = new Date(eventStart.getTime() - assignmentBuffer * 60 * 60 * 1000);
        if (currentTime < bufferStart) {
          freeTime.push({ start: currentTime, end: bufferStart });
          console.log('Free time added before assignment:', { start: currentTime, end: bufferStart });
        }
        currentTime = new Date(event.end.dateTime || event.end.date); // Use UTC
        console.log('Current time updated to after assignment:', currentTime);
        return;
      }

      // Check for exam keywords
      if (examKeywords.some(keyword => eventSummary.includes(keyword))) {
        const bufferStart = new Date(eventStart.getTime() - examBuffer * 60 * 60 * 1000);
        if (currentTime < bufferStart) {
          freeTime.push({ start: currentTime, end: bufferStart });
          console.log('Free time added before exam:', { start: currentTime, end: bufferStart });
        }
        currentTime = new Date(event.end.dateTime || event.end.date); // Use UTC
        console.log('Current time updated to after exam:', currentTime);
        return;
      }

      // Regular event
      if (currentTime < eventStart) {
        freeTime.push({ start: currentTime, end: eventStart });
        console.log('Free time added:', { start: currentTime, end: eventStart });
      }
      currentTime = new Date(event.end.dateTime || event.end.date); // Use UTC
      console.log('Current time updated to:', currentTime);
    });

    // Add remaining free time until the end of the specified period
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + days); // Adjust as needed for the specified number of days
    endTime.setHours(23, 59, 59, 999); // End at the end of the day
    console.log('End time:', endTime);
    if (currentTime < endTime) {
      freeTime.push({ start: currentTime, end: endTime });
      console.log('Remaining free time added:', { start: currentTime, end: endTime });
    }

    // Group free time by date
    const freeTimeByDate = freeTime.reduce((acc, interval) => {
      const date = interval.start.toLocaleDateString('en-US');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(interval);
      return acc;
    }, {});

    // Format free time for storage
    const formattedFreeTime = Object.keys(freeTimeByDate).map(date => ({
      date,
      intervals: freeTimeByDate[date]
    }));

    // Save free time to the database
    await FreeTime.findOneAndUpdate(
      { email: users.map(user => user.email).join(',') },
      { email: users.map(user => user.email).join(','), freeTime: formattedFreeTime },
      { new: true, upsert: true }
    );

    console.log('Free time calculated and stored:', formattedFreeTime);

    return formattedFreeTime;
  } catch (error) {
    console.error('Error calculating free time for multiple users:', error);
    throw new Error('Error calculating free time for multiple users');
  }
};

module.exports = {
  calculateFreeTimeForMultipleUsers
};