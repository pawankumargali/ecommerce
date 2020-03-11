const router = require('express').Router();
const { createProduct } = require('../controllers/product');
const { requireSignIn, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { 
        productById, getProduct, getProductImage, deleteProduct, 
        updateProduct, getAllProducts, getRelatedProducts,
        getAllProductCategories,getProductsBySearch 
      } = require('../controllers/product');

// GET
router.get('/product/:productId', getProduct);
router.get('/product/image/:productId', getProductImage);
router.get('/products', getAllProducts);
router.get('/products/related/:productId', getRelatedProducts);
router.get('/products/categories', getAllProductCategories);

// POST
router.post('/product/create/:userId', requireSignIn, isAdmin, createProduct);
router.post('/products/by/search',getProductsBySearch)

// DELETE
router.delete('/product/:productId/:userId', requireSignIn, isAdmin, deleteProduct);

// PUT
router.put('/product/:productId/:userId', requireSignIn ,isAdmin, updateProduct);

// ROUTE PARAMS
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;