const router = require('express').Router();
const {signUpValidator, signInValidator} = require('../validators/auth');
const {signUp, signIn, signOut, requireSignIn} = require('../controllers/auth');

router.post('/signup', signUpValidator, signUp);
router.post('/signin', signInValidator, signIn);
router.get('/signout', requireSignIn, signOut)

module.exports = router;