const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const { isAuth, isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer')

router
    .route('/report')
    .post(multer.uploadHandler,userController.createUserReport)
    .get(isAdmin,userController.getAllUserReport);

router
    .route('/report/:id')
    .get(isAdmin,userController.getUserReport)
    .patch(multer.uploadHandler,userController.updateUserReport)
    .delete(isAdmin,userController.deleteUserReport)
 


 router.get('/city',isAuth,userController.getUniqueCities)
    router
    .route('/updateMe')
    .patch(isAuth,multer.singleFileUpload,userController.updateMe)
router
    .route('/myProfile')
    .get(isAuth,  userController.getMyProfile)

router
    .route('/')
    .post(isAdmin,userController.createUser)
    .get(isAdmin,userController.getAllUsers);

router
    .route('/:id')
    .get(isAdmin,userController.getUser)
    .patch(isAdmin,multer.singleFileUpload,userController.updateUser)
    .delete(isAdmin,userController.deleteUser)
      


     


// router
//     .route('/updateMe')
//     .put(isAuth,multer.singleFileUpload,userController.updateMe)

    // router.get('/doctor/today-earnings/:id', Controller.getTodayEarnings);



module.exports = router