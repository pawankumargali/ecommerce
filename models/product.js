const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required:true,
        maxlength:300
    },
    price: {
        type: Number,
        trim: true,
        required:true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required:true
    },
    sold: {
        type:Number,
        default:0
    },
    image: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }

}, {timestamps:true})

const Product =  mongoose.model('Product', productSchema);

module.exports = Product;