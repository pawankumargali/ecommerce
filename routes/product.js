const router = require('express').Router();
const { createProduct } = require('../controllers/product');
const { requireSignIn, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { productById, getProduct, deleteProduct, updateProduct } = require('../controllers/product');

router
.get('/:productId', getProduct)
.post('/create/:userId', requireSignIn, isAdmin, createProduct)
.delete('/:productId/:userId', requireSignIn, isAdmin, deleteProduct)
.put('/:productId/:userId', requireSignIn ,isAdmin, updateProduct);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;