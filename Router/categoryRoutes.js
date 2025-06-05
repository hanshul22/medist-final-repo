const express = require('express');
const categoryController = require('../Controller/categoryController');
const { isAuth ,isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer');

const router = express.Router();

// Auth routes *****************************************************************

router.get('/web',categoryController.getAllWebCategory);
  router
  .route('/')
  .get(isAuth,categoryController.getAllCategory)
  .post(isAdmin,multer.singleFileUpload,categoryController.createCategory)
  router
  .route('/:id')
  .get(categoryController.getCategory)
  .delete(isAdmin,categoryController.deleteCategory)
  .patch(isAdmin,multer.singleFileUpload,categoryController.updateCategory)

module.exports = router;