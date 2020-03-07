module.exports.signUpValidator = function(req,res,next) {
    req.check('name', 'Name is required').notEmpty();

    req.check('email','Email is required').notEmpty()
        .isEmail()
        .withMessage('invalid email address');
    
    req.check('password')
        .isLength({min:5})
        .withMessage('password must be atleast 5 characters long')
        .matches(/(?=.*[a-z])/)
        .withMessage('password must contain atleast 1 lower-case letter')
        .matches(/(?=.*[A-Z])/)
        .withMessage('password must contain atleast 1 upper-case letter')
        .matches(/(?=.*[0-9])/)
        .withMessage('password must contain atleast 1 digit')
        .matches(/(?=.*[\!\@\#\$\%\^\&\*])/)
        .withMessage('password must contain atleast 1 special character');

    const errors = req.validationErrors();
    if(errors) {
        let firstErr = errors.map(error => error.msg)[0];
        return res.status(400).json({err:firstErr});
    }
    next();
}

module.exports.signInValidator = function(req,res,next) {
    req.check('email','Email is required').notEmpty()
        .isEmail()
        .withMessage('invalid email address');
    const errors = req.validationErrors();
    if(errors) {
        let firstErr = errors.map(error => error.msg)[0];
        return res.status(400).json({err:firstErr});
    }
    next();
}