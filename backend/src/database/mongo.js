const mongoose = require('mongoose');
const url = "mongodb://mongo-server:27017/gym-app";

const User = require('../models/user');
const Workout = require('../models/workout');

const users = require('../config/users');
const workouts = require('../config/workouts');

const setupDB = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  // Add first users to Mongo
  if ( User.exists() ) {
    User.collection.drop();
  }
  await User.createCollection();
  await User.collection.insertMany(users);
  // Add first workouts
  if ( Workout.exists() ) {
    Workout.collection.drop();
  }
  await Workout.createCollection();
  // Link user with workouts
  const userIds = await User.find({}, '_id');
  for ( let i = 0; i < userIds.length; i++ ) {
    workouts[i].user_id = userIds[i]._id;
  }
  await Workout.collection.insertMany(workouts);
  mongoose.connection.close();
};

module.exports = setupDB;