const express = require('express');
const viewController = require('../controller/viewsController');
const authController = require('../controller/authController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/',viewController.getLoginTemp);
router.get('/panou',viewController.getAllServices);
router.get('/form-service',viewController.createServiceForm);
router.get('/form-client',viewController.createClient);
router.get('/get-service/:id',viewController.getServiceById);
router.get('/get-client/:id',viewController.getClientById);
router.get('/create-users',viewController.singInAdmin);
router.get('/get-al-users',viewController.getAllUsers);
router.get('/get-user-id/:user_id',viewController.getUser);
router.get('/forgot-password',viewController.forgottPassword);
router.get('/reset-password/:token',viewController.resetPassword);
router.get('/account-settings',viewController.updateMyAccount);
router.get('/create-products',viewController.createProducts);


module.exports = router;     