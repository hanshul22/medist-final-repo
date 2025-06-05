const express = require("express");
const router = express.Router();
const Multer = require('../Util/Multer')

const ContactController = require("../Controller/contactController");
const { uploadHandler } = require('../Util/Multer');
const { isAuth ,isAdmin} = require('../Util/auth')


// router.get('/howtoallimage',isAdmin,appPolicyController.getAllHowToImage)

router.get('/version',isAuth,ContactController.getVersion)
    router
    .route('/')
    .get(ContactController.getContactList)
    .post(isAdmin, ContactController.createContact)

    router.patch('/:id',isAdmin, ContactController.updateContact)

    // router
    // .route('/howtoimage')
    // .get(isAuth,appPolicyController.getHowToImage)
    // .patch(isAdmin,uploadHandler,appPolicyController.updateHowToImage)

module.exports = router