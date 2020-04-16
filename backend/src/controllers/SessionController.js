const crypto = require('crypto');

const mongoose = require('mongoose');
const url = "mongodb://mongo-server:27017/gym-app";
const User = require('../models/user');

const client = require('../database/redis');

const SessionController = {
  login: async (req, res) => {
    const { user, password } = req.body;
    if ( user && password ) {
      try {
        await mongoose.connect(url, { useNewUrlParser: true });
        const userId = await User.find({ 
          name: user,
          password: crypto.createHash('sha256').update(password).digest('base64')
        }, '_id');
        if ( userId.length > 0 ) {
          const id = userId[0]._id
          client.set(id, { session: true }); // Create user 'session'
          res.json({ id: id });
        } else {
          res.json({ message: 'Incorrect username or password.' });
        }
      } catch (err) {
        console.error(err);
        res.status(503).json({ message: 'Unavailable' });
      }
      return mongoose.connection.close();
    } else {
      return res.json({ message: 'Incomplete request. Please provide user and password.' });
    }
  }
};

module.exports = SessionController;