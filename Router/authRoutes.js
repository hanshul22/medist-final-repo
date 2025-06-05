const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const multer = require('../Util/Multer');
const { isAuth } = require('../Util/auth');

// router.post('/verifysignup', authController.verifyOTPForSignUp);

router.post('/register', multer.uploadHandler, authController.register);
router.post('/login', authController.login);
// router.post('/resendOtp', authController.resendOTP);
// router.post('/verify', authController.verifyOTP);

router
    .route('/logout')
    .post(isAuth, authController.logOut)



module.exports = router;