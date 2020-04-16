const router = require('express').Router();
const {signUpValidator, signInValidator} = require('../validators/auth');
const {signUp, signIn, signOut, requireSignIn} = require('../controllers/auth');

// GET
router.get('/auth/signout', requireSignIn, signOut)

// POST
router.post('/auth/signup', signUpValidator, signUp);
router.post('/auth/signin', signInValidator, signIn);

module.exports = router;