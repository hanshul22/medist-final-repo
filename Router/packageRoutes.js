const express = require('express');
const packageController = require('../Controller/packageController.js');
const { isAuth ,isAdmin } = require('../Util/auth');


const router = express.Router();

// Auth routes *****************************************************************
router.get('/home',packageController.homePackage);
router.get('/search',packageController.searchTitleByPackage);
router.get('/category/:categoryId',packageController.getAllPackageBYCategory);
router.get('/web',packageController.getAllWebPackage);
router.get('/web/popular',packageController.getAllPopularPackage);
  router
  .route('/')
  .get(packageController.getAllPackage)
  .post(isAdmin,packageController.createPackage)
  router
  .route('/:id')
  .get(packageController.getPackageById)
  .delete(isAdmin,packageController.deletePackage)
  .patch(isAdmin,packageController.updatePackage)

module.exports = router;