const router = require('express').Router();
const {signUpValidator, signInValidator} = require('../validators/auth');
const {signUp, signIn, signOut, requireSignIn} = require('../controllers/auth');

// GET
router.get('/signout', requireSignIn, signOut)

// POST
router.post('/signup', signUpValidator, signUp);
router.post('/signin', signInValidator, signIn);

// ROUTE PARAMS
module.exports = router;