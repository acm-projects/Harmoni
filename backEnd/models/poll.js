const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  findPotentialTimesUntil: { type: Date, required: true },
  minimumDuration: { type: Number, required: true }, // Duration in minutes
  excludeMembers: [{ type: String }], // Array of user emails to exclude
  allowMultipleVotes: { type: Boolean, default: false },
  createdBy: { type: String, required: true },
  freeTimeSlots: [
    {
      date: { type: String, required: true },
      intervals: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true }
        }
      ]
    }
  ],
  votes: [
    {
      participant: { type: String, required: true },
      slots: [
        {
          date: { type: String, required: true },
          intervals: [
            {
              start: { type: String, required: true },
              end: { type: String, required: true },
              vote: { type: Boolean, required: true }
            }
          ]
        }
      ]
    }
  ]
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;