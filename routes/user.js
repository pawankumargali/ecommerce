const router = require('express').Router();
const {userById , getUser, updateUser} = require('../controllers/user');
const {requireSignIn, isAuth} = require('../controllers/auth');

// GET
router.get('/user/:userId', requireSignIn, isAuth, getUser);

// UPDATE
router.put('/user/:userId',requireSignIn, isAuth, updateUser)

// ROUTE PARAMS
router.param('userId', userById)

module.exports = router;