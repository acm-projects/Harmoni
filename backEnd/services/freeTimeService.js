const { calculateFreeTimeForMultipleUsers } = require('./freeTimeService/calculateFreeTime');
const { formatFreeTimeForDisplay } = require('./freeTimeService/formatFreeTime');

const calculateFreeTimeForMultipleUsersAndFormat = async (users, days) => {
  try {
    const formattedFreeTime = await calculateFreeTimeForMultipleUsers(users, days);
    return formatFreeTimeForDisplay(formattedFreeTime);
  } catch (error) {
    console.error('Error calculating and formatting free time for multiple users:', error);
    throw new Error('Error calculating and formatting free time for multiple users');
  }
};

module.exports = {
  calculateFreeTimeForMultipleUsersAndFormat
};