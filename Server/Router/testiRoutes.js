const express = require('express');
const testiController = require('../Controller/testimonialController');
const { isAuth ,isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer');

const router = express.Router();

// Auth routes *****************************************************************

router.get('/web',testiController.getAllWebTestimonial);
  router
  .route('/')
  .get(isAuth,testiController.getAllTestimonial)
  .post(isAdmin,multer.singleFileUpload,testiController.createTestimonial)
  router
  .route('/:id')
  .get(testiController.getTestimonial)
  .delete(isAdmin,testiController.deleteTestimonial)
  .patch(isAdmin,multer.singleFileUpload,testiController.updateTestimonial)

module.exports = router;