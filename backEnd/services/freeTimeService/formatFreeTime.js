const moment = require('moment-timezone');

const formatFreeTimeForDisplay = (formattedFreeTime) => {
  const formattedFreeTimeForDisplay = formattedFreeTime.map(day => ({
    date: day.date,
    intervals: day.intervals.map(interval => ({
      start: moment(interval.start).tz('America/Chicago').format('YYYY-MM-DD hh:mm A z'),
      end: moment(interval.end).tz('America/Chicago').format('YYYY-MM-DD hh:mm A z')
    }))
  }));

  console.log('Free time formatted for display:', formattedFreeTimeForDisplay);
  return formattedFreeTimeForDisplay;
};

module.exports = {
  formatFreeTimeForDisplay
};