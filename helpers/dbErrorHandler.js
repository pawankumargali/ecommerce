module.exports.dbErrorHandler = function(error) {
    if(error.code==11000) 
        return 'email already exists';
    return error.errmsg;
}