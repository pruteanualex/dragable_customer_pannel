const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

//Authentification Routes
router.route('/singup')
      .post(authController.protect,authController.restrictTo('administrator'),authController.singup);
router.route('/getAllUser')
      .get(authController.protect,authController.restrictTo('administrator'),authController.getAllUsers);      

router.route('/login')
      .post(authController.login);

router.route('/logout')
      .get(authController.logout);
      
router.route('/forgot-password')
      .post(authController.forgotPassword);

router.route('/reset-password/:token_reset')
      .patch(authController.resetPassword);  


router.route('/getall-users')
      .get(authController.protect,authController.restrictTo('administrator'),authController.getAllUsers);
 
router.route('/updateMy/:myId')
      .patch(authController.protect,authController.updateMyPersonalData);

router.route('/updateMyPassword/:user_id')
      .patch(authController.protect,authController.updateMyPassword)

router.route('/get-user/:user_id')
      .get(authController.protect,authController.restrictTo('administrator'),authController.getUser)
      .patch(authController.protect,authController.restrictTo('administrator'),authController.updateUser)
      .delete(authController.protect,authController.restrictTo('administrator'),authController.deleteUser);      
module.exports = router;      
