const router = require('express').Router();
const { categoryById, getCategory, 
        createCategory, updateCategory, 
        deleteCategory, getAllCategories
       } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { requireSignIn, isAdmin } = require('../controllers/auth');

// GET
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

// POST
router.post('/category/create/:userId', requireSignIn, isAdmin, createCategory);

// PUT
router.put('/category/:categoryId/:userId', requireSignIn, isAdmin, updateCategory);

// DELETE
router.delete('/category/:categoryId/:userId', requireSignIn, isAdmin, deleteCategory);

// ROUTE PARAMS
router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;