const express = require('express');

const router = express.Router();

const SessionController = require('../controllers/SessionController');
const WorkoutsController = require('../controllers/WorkoutsController');

router.post('/session', SessionController.login);
router.get('/workouts', WorkoutsController.index);

module.exports = router;