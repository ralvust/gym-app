const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  user_id: mongoose.Types.ObjectId,
  workouts: [
    {
      name: String,
      exercises: [
        {
          name: String,
          series: [
            {
              reps: Number,
              weight: String
            }
          ]
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Workout', workoutSchema);