module.exports.dbErrorHandler = function(error) {
    if(error.code==11000) {
        const field = error.errmsg.match(/\{.*\}/)
        return `${field} already exists`;
    }
    if(!error.errmsg)
        return error;
    return error.errmsg;
}