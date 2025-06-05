const Service = require('../model/Service');
const fs = require('fs');
const path = require('path');


exports.getAllService = async (req, res) => {
  try {
    let filter = {};

    // For non-admin users, filter by status and user type (if applicable)
    if (req.user.userType !== 'Admin') {
      filter.status = "Active"; 
    }

    const service = await Service.find(filter).sort({ createdAt: -1 }); // Sort by createDate
    res.status(200).json({ status: true, data: service });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

exports.createService = async (req, res) => {
  try {
   
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const service = await Service.create(req.body);
    res.status(201).json({ status: true, data: service });
  } catch (err) {
    res.status(400).json({ status: false,message:err.message|| "server error", error: err.message });
  }
};


exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ status: false, error: 'Service not found' });
    }

    if (service.image) {
        // Construct the image path relative to the project directory
        const imagePath = path.join(__dirname, '../Uploads', path.basename(service.image));
  
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
      await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};



exports.updateService = async (req, res) => {
  try {
    // Check if an image file is provided
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!service) {
      return res.status(404).json({ status: false, error: 'Service not found' });
    }

    res.status(200).json({ status: true, data: service });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};


exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ status: false, error: 'Service not found' });
    }

    res.status(200).json({ status: true, data: service });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


  