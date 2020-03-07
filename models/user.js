const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    about: {
        type:String,
        trim:true
    },
    role: {
        type:Number,
        default:0
    },
    purchase_history: {
        type:Array,
        default:[]
    }
}, {timestamps:true});


userSchema.methods.hashPassword = function(password) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

userSchema.methods.authenticate = function(password) {
    const result = bcrypt.compareSync(password,this.password);
    return result;
}

const User = mongoose.model('User',userSchema);

module.exports = User;