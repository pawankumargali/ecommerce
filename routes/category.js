const router = require('express').Router();
const { createCategory } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { isAdmin } = require('../controllers/auth');

router.post('/create/:userId', isAdmin, createCategory);

router.param('userId', userById)

module.exports = router;