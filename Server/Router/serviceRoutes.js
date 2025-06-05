const express = require('express');
const serviceController = require('../Controller/serviceController');
const { isAuth ,isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer');

const router = express.Router();

// Auth routes *****************************************************************


  router
  .route('/')
  .get(isAuth,serviceController.getAllService)
  .post(isAdmin,multer.singleFileUpload,serviceController.createService)
  router
  .route('/:id')
  .get(isAuth,serviceController.getService)
  .delete(isAdmin,serviceController.deleteService)
  .patch(isAdmin,multer.singleFileUpload,serviceController.updateService)

module.exports = router;