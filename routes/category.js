const router = require('express').Router();
const { categoryById, getCategory, 
        createCategory, updateCategory, 
        deleteCategory, getAllCategories
       } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { requireSignIn, isAdmin } = require('../controllers/auth');

router
.get('/:categoryId', getCategory)
.post('/create/:userId', requireSignIn, isAdmin, createCategory)
.put('/:categoryId/:userId', requireSignIn, isAdmin, updateCategory)
.delete('/:categoryId/:userId', requireSignIn, isAdmin, deleteCategory)
.get('/', getAllCategories);

router
.param('userId', userById)
.param('categoryId', categoryById);

module.exports = router;