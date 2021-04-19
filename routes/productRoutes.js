const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');
const router = express.Router();


router.route('/create-product').post(authController.protect,productController.createNewProduct);
router.route('/getAllProducts--shop').get(productController.getAllProducts);
router.route('/get-single-product/:productID').get(productController.getSingleProductBaseOnId);
router.route('/get-available-category').get(productController.getAllCategory);
router.route('/get-all-cat-product/:categoryName').get(productController.getAllProductCategory);
router.route('/get-all-prices').get(productController.getProductPrice);
router.route('/get-all-product-base-price/:priceSelected').get(productController.getAllProductPrice);
router.route('/delete-product/:deletedProdId').delete(productController.deleteProduct);
router.route('/update-product/:productID').patch(productController.updateProductFnc);
module.exports = router;


