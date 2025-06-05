
const Notification = require('../model/Notification');
const fs = require('fs');
const path = require('path');
const FirebaseAdmin = require('../Util/firebase');
const User = require('../model/User');
FirebaseAdmin.initialize();

exports.getAllNotification = async (req, res) => {
  try {
    let filter = {};

    if (req.user.userType !== 'Admin') {
      filter.status = "show"; 
     
    }

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: notifications });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};


// POST /api/notification
exports.createNotification = async (req, res) => {
  try {
    // Add the image path if a file is uploaded
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }
    // Fetch all users
    const users = await User.find();

    const firebaseAdmin = FirebaseAdmin.getInstance(); // Initialize Firebase Admin
    // console.log('Firebase Admin instance initialized');
   
    for (let user of users) {
      const title = req.body.title || 'Winja Travels';
      const message = req.body.message || 'This is exclusive package';
      const token = user.fcmToken;

      // console.log(`Sending notification to user ${user._id}, Token: ${token}, Message: ${message}`);
      try {
         
         const response = await firebaseAdmin.sendSingleMessaging(token, title, message);
         console.log('Notification sent successfully:', response);
      } catch (err) {        
        console.error('Error sending notification:', err.message);
      }
    }

    const notification = await Notification.create(req.body);

    // Respond with success and details of the notifications
    res.status(201).json({
      status: true,
      message: "Notification created and sent",
      data: notification
    });
  } catch (err) {
    console.error("Error creating notification:", err.message);
    res.status(500).json({ status: false, error: "Server error", message: err.message });
  }
};



exports.deleteNotification = async (req, res) => {
  try {
    // Find the notification by ID
    const notification = await Notification.findById(req.params.id);

    // Check if the notification exists
    if (!notification) {
      return res.status(404).json({ status: false, error: 'Notification not found' });
    }

    // If notification has an associated image, delete the image file
    if (notification.image) {
      // Construct the image path relative to the project directory
      const imagePath = path.join(__dirname, '../Uploads', path.basename(notification.image));

      // Check if the image file exists before unlinking
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Failed to delete image:', err);
          }
        });
      }
    }

    // Delete the notification from the database
    await Notification.findByIdAndDelete(req.params.id);

    // Send success response
    res.status(200).json({ status: true, message: 'Deleted successfully', data: {} });

  } catch (err) {
    // Handle errors
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

// PUT /api/notification/:id
exports.updateNotification = async (req, res) => {
  try {
  
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ status: false, error: 'Notification not found' });
    }

    // Check if an image file is provided
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    } else {
      // Retain the existing image
      req.body.image = notification.image;
    }

    // Update the notification with new data
    Object.keys(req.body).forEach(key => {
      notification[key] = req.body[key];
    });

    await notification.save();

    res.status(200).json({ status: true, data: notification });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// GET /api/notification/:id
exports.getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).sort({ createdAt: -1 });
    if (!notification) {
      return res.status(404).json({ status: false, error: 'Notification not found' });
    }
    res.status(200).json({ status: true, data: notification });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};



