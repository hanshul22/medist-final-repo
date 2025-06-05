const express = require("express");
const router = express.Router();
const Multer = require('../Util/Multer')

const appPolicyController = require("../Controller/appPolicyController");
const { uploadHandler } = require('../Util/Multer');
const { isAuth ,isAdmin} = require('../Util/auth')


// router.get('/howtoallimage',isAdmin,appPolicyController.getAllHowToImage)
router.
    route('/')
    .get(appPolicyController.getAppPolicy)
    .patch(appPolicyController.updateAppPolicy);

    // .post(appPolicyController.createAppPolicy)

    // router
    // .route('/contact')
    // .get(isAuth,appPolicyController.getContactList)
    // .post(isAdmin,uploadHandler, appPolicyController.createContact)

    // router.patch('/contact/:id',isAdmin,uploadHandler,appPolicyController.updateContact)

    // router
    // .route('/howtoimage')
    // .get(isAuth,appPolicyController.getHowToImage)
    // .patch(isAdmin,uploadHandler,appPolicyController.updateHowToImage)

module.exports = router