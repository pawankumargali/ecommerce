const User = require('../models/user');
const { dbErrorHandler } = require('../helpers/dbErrorHandler');

module.exports.userById = async function(req, res, next, id) {
    try{
        const user = await User.findById(id);
        if(!user) 
            return res.status(404).json({msg:'User not found'});
        req.profile = user;
        next();
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}