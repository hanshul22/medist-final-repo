const express = require('express');
const bookingController = require('../Controller/bookingController'); // Adjust path as needed
const { isAuth, isAdmin } = require('../Util/auth');
const multer = require('../Util/Multer');

const router = express.Router();

// Routes for handling all packages
  router.post('/verify-payment', isAuth, bookingController.verifyPayment)
router.get('/download-invoice/:id',  bookingController.downloadInvoice);
router.get('/cancel/download-invoice/:id', isAuth, bookingController.downloadCancelInvoice);
router.patch('/:id/cancel', isAuth, bookingController.cancelBooking);
router.patch('/updatestatus/:id', isAdmin, bookingController.updateBookingStatus);
router.get('/my', isAuth , bookingController.getMyBooking);
router
  .route('/')
  .get(isAdmin, bookingController.getAllBooking)  // Authenticated users can view packages
  .post(isAuth, multer.uploadHandler, bookingController.createBooking); // Only admin can create packages, with image upload handling


router
  .route('/:id')
  .get(isAuth, bookingController.getBooking) 
  

module.exports = router;
