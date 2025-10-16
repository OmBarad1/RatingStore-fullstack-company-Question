const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const { getOwnerRatings } = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware, submitRating);
router.get('/owner', authMiddleware, getOwnerRatings);
module.exports = router;
