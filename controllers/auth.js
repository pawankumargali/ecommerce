const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {dbErrorHandler} = require('../helpers/dbErrorHandler');

module.exports.signUp = async function(req,res) {
    const {name, email, password} = req.body;
    let user = new User({name:name, email:email});
    user.password = user.hashPassword(password);
    try {
        await user.save();
        user.password = undefined;
        res.status(200).json(user);
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}

module.exports.signIn = async function(req,res) {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user) 
            return res.status(400).json({err:'user is not registered. Please sign up'});
        // Authenticate User
        isValid = user.authenticate(password);
        // If user is unauthenticated
        if(!isValid) 
            return res.status(401).json({err:'Invalid password'});
        //If user is authenticated, generate token and send response cookie
        const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET, {expiresIn:'3h'});
        // Persist token as 't'
        // res.cookie('t',token, { maxAge: 900000, httpOnly: true }); 
        user.password=undefined;
        return res.status(200).json({token:token, user});
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}

module.exports.signOut = function(req, res) {
    // res.clearCookie('t');
    res.status(200).json({msg:'Signout successful'});
}

module.exports.requireSignIn = async function(req,res, next) {
    const errMsg = {msg: 'Unauthenticated request. Please sign in'};
    // const token = req.cookies.t;
    const token = req.header('Authorization').split(' ');
    if(!token) 
        return res.status(401).json(errMsg);
    try {
        const user = await jwt.verify(token[1],process.env.JWT_SECRET);
        if(!user)
            return res.status(401).json(errMsg);
        req.auth = {auth:true, id:user.id, role:user.role};
        next();
    }
    catch(err) {
        res.status(400).json({err:err});
    }
}

module.exports.isAuth = function(req, res, next) {
    let isAuth = (req.auth) && (req.profile) && ((req.auth.id == req.profile.id) || (req.auth.role==1))
    if(!isAuth)
        return res.status(401).json({err:'Unauthorized request'});
    next();
}

module.exports.isAdmin = function(req, res, next) {
    let isAdmin = (req.auth && req.profile && (req.profile.role==1));
    if(!isAdmin) 
        return res.status(401).json({err:'Unauthorized request to access admin resource'});
    next();
}