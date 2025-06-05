const express = require('express');
const notificationController = require('../Controller/notificationController');
const { isAuth ,isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer')

const router = express.Router();

// Auth routes *****************************************************************
 
// router.get('/push', isAdmin, notificationController.getPushNotification);
// router.delete('/push/:id', isAdmin, notificationController.deletePushNotification);
  router
  .route('/')
  .get(isAuth,notificationController.getAllNotification)
  .post(isAdmin,multer.singleFileUpload,notificationController.createNotification)
  router
  .route('/:id')
  .get(isAuth,notificationController.getNotification)
  .delete(isAdmin,notificationController.deleteNotification)
  .patch(isAdmin,multer.singleFileUpload,notificationController.updateNotification)

//   router.post('/sendNotification',notificationController.sendNotification);

module.exports = router;