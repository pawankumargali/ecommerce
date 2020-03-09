const Product = require('../models/product');
const { IncomingForm } = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { dbErrorHandler } = require('../helpers/dbErrorHandler');

module.exports.createProduct = function(req, res) {

    const form = new IncomingForm({keepExtensions: true});

    form.parse(req, (err, fields, files) => {

        if(err) 
            return res.status(400).json({err:'Image couldn\'t be uploaded'});

        const {name, description, price, category, quantity } = fields;

        if(!name || !description || !price || !category || !quantity) 
            return res.json({err: 'Fields name, description, price, category and quantity are required'});

        let product = new Product(fields);

        if(files.image) {

            if(files.image.size > 1000000) 
                return res.status(400).json({err:'Image size should be less than 1 MB'});

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        product.save()
                .then( () =>  res.status(200).json(product) )
                .catch( err => res.status(400).json({ err: dbErrorHandler(err) }) ); 
        
    });
}

module.exports.productById = async function(req, res, next, id) {
    try {
        const product = await Product.findById(id);
        if(!product)
            res.status(404).json({err:'Product not found'})
        req.product = product;
        next();
    }
    catch(err) {
        res.status(400).json({err: dbErrorHandler(err)});
    }
}


module.exports.getProduct = function(req,res) {
    req.product.image = undefined;
    res.status(200).json(req.product);
}


module.exports.deleteProduct = async function(req, res) {
    const product = req.product;
    try {
        await Product.findByIdAndRemove(product.id);
        res.status(200).json({deleteSuccess: true, product:product.name});
    }
    catch(err) {
        res.status(200).json({deleteSuccess:false, err:'Couldn\'t find or delete product' });
    }
}

module.exports.updateProduct = function(req, res) {

    form = new IncomingForm({keepExtensions:true});

    form.parse(req, (err, fields, files) => {

       if(err)
        return res.status(400).json({err:'Image couldn\'t be uploaded'});

        const {name, description, price, category, quantity } = fields;

        if(!name || !description || !price || !category || !quantity) 
            return res.json({err: 'Fields name, description, price, category and quantity are required'});

        let product = req.product;
        product = _.extend(product, fields);

        if(files.image) {

            if(files.image.size > 1000000) 
                return res.status(400).json({err:'Image size should be less than 1 MB'});

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        product.save()
                .then( () =>  res.status(200).json(product) )
                .catch( err => res.status(400).json({ err: dbErrorHandler(err) }) ); 
        
    });

}