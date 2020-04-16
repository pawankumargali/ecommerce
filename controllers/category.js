const Category = require('../models/category');
const {dbErrorHandler} = require('../helpers/dbErrorHandler');

module.exports.createCategory = async function(req, res) {
    const {name} = req.body;
    category = new Category({name:name});
    try {
        await category.save();
        res.status(201).json(category);
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}

module.exports.categoryById = async function(req, res, next, id) {
    try {
        const category = await Category.findById(id);
        req.category = category;
        next();   
    }
    catch(err) {
        res.status(200).json({err:dbErrorHandler(err)});
    }
}

module.exports.getCategory = function(req, res) {
    res.status(200).json(req.category);
}

module.exports.updateCategory = async function(req,res) {
    try {
        let category = await Category.findById(req.category.id);
        if(!category) 
            return res.status(200).json({err:'Couldn\'t find Category'});
        category.name = req.body.name;
        await category.save();
        res.status(200).json({updateSuccess:true, category:category.name});
        
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}

module.exports.deleteCategory = async function(req, res) {
    try {
        console.log(req.category.id);
        let deletedCategory = await Category.findByIdAndRemove(req.category.id);
        res.status(200).json({deleteSuccess:true, category:deletedCategory.name});
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }

}

module.exports.getAllCategories = async function(req, res) {
    try {
        results = await Category.find({});
        let categories = [];
        results.forEach(category => categories.push({_id: category._id, name:category.name}));
        res.status(200).json(categories);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({err: dbErrorHandler(err)});
    }
}