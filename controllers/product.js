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
            res.status(404).json({err:'Product not found'});
        req.product = product;
        next();
    }
    catch(err) {
        res.status(400).json({err: dbErrorHandler(err)});
    }
}


module.exports.getProduct = function(req, res) {
    req.product.image = undefined;
    res.status(200).json(req.product);
}


module.exports.getProductImage = function(req, res, next) {
    const productImg = req.product.image.data;
    console.log('hello');
    if(productImg) {
        res.set('Content-Type', req.product.image.contentType);
        res.status(200).json(productImg);
    }
    next();
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


/* 
SORTED PRODUCTS

Products sorted by sell. 
bysell = /products?sortBy=sold&order=desc&limit=5

Products sorted by arrival
byarrival = /products?sortBy=createdAt&order=desc&limit=5

Products sorted by ObjectId by default
allproducts = /products
*/

module.exports.getAllProducts = async function(req, res) {
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'asc';
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        let products = await Product.find({})
                                    .select('-image -sold')
                                    .populate('category', 'name')
                                    .sort([[sortBy, order]])
                                    .limit(limit);
        res.status(200).json(products);
    }
    catch(err) {
        res.status(400).json({err: dbErrorHandler(err)});
    }
}

/* 
RELATED PRODUCTS

Returns products in the same category as the product specified using productId in

 /products/related/:productId?limit=5

*/
module.exports.getRelatedProducts = async function(req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        let relProducts = await Product.find({category:req.product.category, _id:{$ne:req.product._id}})
                                        .select('-image -sold')
                                        .populate('category', 'name')
                                        .limit(limit);
        res.status(200).json(relProducts);
    }
    catch(err) {
        res.status(400).json({err: dbErrorHandler(err)});
    }
}

/*
RETURNS CATEGORIES BASED ON PRODUCTS
*/

module.exports.getAllProductCategories = async function(req, res) {
    try {
        let prodCategories = await Product.distinct('category',{});
        res.status(200).json(prodCategories);
    }
    catch(err) {
        res.status(400).json({err: dbErrorHandler(err)});
    }
}


/*
RETURNS PRODUCT BY SEARCH

Product search is implemented in React Front-end and products are filtered based on category and price range

Filters are passed as an object of arrays filters: { price: [min,max], categories=[cat1,cat2,cat3...] }
*/
module.exports.getProductsBySearch = async function(req, res) {
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'asc';
    const skip = parseInt(req.query.skip);
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
         // If no filters are applied return all products
        let products;
        if(!req.body.filters) {
            products = await Product.find({})
                                        .select('-image -sold')
                                        .populate('category','name')
                                        .sort([[sortBy, order]])
                                        .skip(skip)
                                        .limit(limit);
        }
        else {
            const {price,categories} = req.body.filters;
            const [min, max] = price;
            products = await Product.find({category:{$in:categories}, price:{$gte:min, $lte:max}})
                                            .select('-image -sold')
                                            .populate('category','name')
                                            .sort([[sortBy, order]])
                                            .skip(skip)
                                            .limit(limit);
        }
        res.status(200).json({results:products.length,products}); 
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}