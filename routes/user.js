const router = require('express').Router();
const {userById , getUser} = require('../controllers/user');
const {requireSignIn, isAuth} = require('../controllers/auth');

// GET
router.get('/:userId', requireSignIn, isAuth, getUser );

// ROUTE PARAMS
router.param('userId', userById)

module.exports = router;