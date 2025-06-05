const express = require('express');
const adminController = require('../Controller/adminController');
const { isAuth ,isAdmin} = require('../Util/auth')
const multer = require('../Util/Multer')


const router = express.Router();

// Admin routes *****************************************************************

router
.route('/profile')
.get(isAdmin,adminController.me)

router
.route('/updateMe')
.patch(isAdmin,multer.singleFileUpload,adminController.updateMe)

router
 .route('/change-password')
 .patch(isAdmin,adminController.changePassword)

router
 .route('/')
 .get(isAdmin,adminController.getAllAdmin)
 .post(isAdmin,adminController.createAdmin)



 router
 .route('/:id')
 .get(isAdmin,adminController.getSingleAdmin)
 .patch(isAdmin,multer.singleFileUpload,adminController.updateAdmin)
 .delete(isAdmin,adminController.deleteAdmin)

router
 .route('/login')
 .post(adminController.login)


router
 .route('/signup')
 .post(adminController.register)



module.exports = router