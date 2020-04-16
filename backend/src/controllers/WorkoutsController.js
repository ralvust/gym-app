const mongoose = require('mongoose');
const url = "mongodb://mongo-server:27017/gym-app";
const Workout = require('../models/workout');

const client = require('../database/redis');

const WorkoutsController = {
  index: async (req, res) => {
    const id = req.headers.authorization;
    if ( id && id.length === 24 ) { // mongoose id has 25 chars
      // Validade user has a 'session'
      if ( await client.exists(id) ) {
        try {
          await mongoose.connect(url, { useNewUrlParser: true });
          const workouts = await Workout.find({ user_id: id.toString() }, 'workouts');
          if ( workouts.length > 0 ) {
            res.json({ workouts: workouts });
          } else {
            res.json({ message: 'No workouts found for this user' });
          }
        } catch (err) {
          console.error(err);
          res.status(503).json({ message: 'Unavailable.' });
        }
        return mongoose.connection.close();
      }
    }
    return res.status(401).json({ message: 'Unauthorized' });  
  }
};

module.exports = WorkoutsController;