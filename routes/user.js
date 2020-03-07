const router = require('express').Router();
const {userById} = require('../controllers/user');
const {requireSignIn, isAuth} = require('../controllers/auth');

router.get('/:userId', requireSignIn, isAuth, (req,res) => res.json({user:req.profile}) );

router.param('userId', userById)

module.exports = router;