const express = require('express');
const { adminDashboard, addUserByAdmin, listUsers, getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/dashboard', authMiddleware, adminDashboard);
router.post('/add', authMiddleware, addUserByAdmin);
router.get('/list', authMiddleware, listUsers);
router.get('/:id', authMiddleware, getUserDetails);

module.exports = router;
