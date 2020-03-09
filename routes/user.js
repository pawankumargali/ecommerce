const router = require('express').Router();
const {userById , getUser} = require('../controllers/user');
const {requireSignIn, isAuth} = require('../controllers/auth');

router.get('/:userId', requireSignIn, isAuth, getUser );

router.param('userId', userById)

module.exports = router;