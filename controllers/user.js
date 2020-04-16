const User = require('../models/user');
const { dbErrorHandler } = require('../helpers/dbErrorHandler');

module.exports.userById = async function(req, res, next, id) {
    try{
        const user = await User.findById(id);
        if(!user) 
            return res.status(404).json({err:'User not found'});
        req.profile = user;
        next();
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}

module.exports.getUser = function(req, res) {
    const user = req.profile;
    user.password = undefined;
    res.json(user);
}

module.exports.updateUser = async function(req, res) {
    try { 
        const user = await User.findByIdAndUpdate(req.profile._id, {$set:req.body}, {new:true});
        user.password=undefined;
        res.status(201).json({updateSuccess:true,user});
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}