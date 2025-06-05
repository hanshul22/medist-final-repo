const express = require('express');
const bannerController = require('../Controller/offerBannerController');
const { isAuth ,isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer');

const router = express.Router();

// Auth routes *****************************************************************

router.get('/web/end',bannerController.getWebAllBannersByEndDate)
router.get('/end',isAuth,bannerController.getAllBannersByEndDate)
  router
  .route('/')
  .get(isAuth,bannerController.getAllBanner)
  .post(isAdmin,multer.singleFileUpload,bannerController.createBanner)
  router
  .route('/:id')
  .get(isAuth,bannerController.getBanner)
  .delete(isAdmin,bannerController.deleteBanner)
  .patch(isAdmin,multer.singleFileUpload,bannerController.updateBanner)

module.exports = router;