const express = require('express');
const pannelController = require('../controller/pannelController');
const authController = require('../controller/authController');
const router = express.Router();


//Services Routes
router.route('/get-allservice')
      .get(authController.protect,pannelController.getPannelController);
router.route('/get-service/:id')
      .get(authController.protect,pannelController.getServicesById);
router.route('/update-service/:id')
      .patch(authController.protect,authController.restrictTo('administrator','editor'),pannelController.findUpdateService);      
router.route('/delete-service/:id')
      .delete(authController.protect,authController.restrictTo('administrator','editor'),pannelController.deleteServices);            
//Clients Routes
router.route('/create-services')
      .post(authController.protect,authController.restrictTo('administrator','editor'),pannelController.createPannelServices);
router.route('/get-allclients')
      .get(authController.protect,pannelController.getAllClients);      
router.route('/create-client')
      .post(authController.protect,authController.restrictTo('administrator','editor'),pannelController.createUserPannel); 
router.route('/get-client/:id')
      .get(authController.protect,pannelController.findClientById);      
router.route('/update-client/:id')
      .patch(authController.protect,authController.restrictTo('administrator','editor'),pannelController.updateClient);   
router.route('/delete-client/:id')
      .delete(authController.protect,authController.restrictTo('administrator','editor'),pannelController.deleteClient);         
      

module.exports = router;