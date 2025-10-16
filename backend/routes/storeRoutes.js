const express = require('express');
const { listStores } = require('../controllers/storeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/list', authMiddleware, listStores);

module.exports = router;
