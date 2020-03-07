const Category = require('../models/category');
const {dbErrorHandler} = require('../helpers/dbErrorHandler');

module.exports.createCategory = async function(req, res) {
    const {name} = req.body;
    category = new Category({name:name});
    try {
        await category.save();
        res.status(201).json({createSuccess:true, categoryName:category.name});
    }
    catch(err) {
        res.status(400).json({err:dbErrorHandler(err)});
    }
}