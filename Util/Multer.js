const multer = require('multer');
const path = require('path');


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Single file upload middleware
exports.singleFileUpload = upload.single('image');



exports.uploadHandler = (req, res, next) => {

  let uploadFields = [
      { name: 'image', maxCount: 1 },
      { name: 'report', maxCount: 1 },
      { name: 'images', maxCount: 10 },
      { name: 'hotelImages', maxCount: 10 },
      
   
  ];
    upload.fields(uploadFields)(req, res, next);
  };