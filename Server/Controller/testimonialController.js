const Testimonial = require('../model/Testimonial');
const fs = require('fs');
const path = require('path');

// GET /api/cat
exports.getAllTestimonial = async (req, res) => {
  try {
    let filter = {};

    // For non-admin users, filter by status and user type (if applicable)
    if (req.user.userType !== 'Admin') {
      filter.status = "Active"; 
    }

    const testi = await Testimonial.find(filter).sort({ createdAt: -1 }); // Sort by createDate
    res.status(200).json({ status: true, data: testi });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

exports.getAllWebTestimonial = async (req, res) => {
    try {
      
  
      const testi = await Testimonial.find({status:"Active"}).sort({ createdAt: -1 }); // Sort by createDate
      res.status(200).json({ status: true, data: testi });
    } catch (err) {
      res.status(500).json({ status: false, error: 'Server Error' });
    }
  };
// POST /api/testi
exports.createTestimonial = async (req, res) => {
  try {
   
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const testi = await Testimonial.create(req.body);
    res.status(201).json({ status: true, data: testi });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// DELETE /api/testi/:id
exports.deleteTestimonial = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if (!testi) {
      return res.status(404).json({ status: false, error: 'Testimonial not found' });
    }

    if (testi.image) {
        // Construct the image path relative to the project directory
        const imagePath = path.join(__dirname, '../Uploads', path.basename(testi.image));
  
        // Check if the image file exists before unlinking
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('Failed to delete image:', err);
            }
          });
        }
      }
  
      // Delete the testi from the database
      await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};



// PUT /api/testi/:id
exports.updateTestimonial = async (req, res) => {
  try {
    // Check if an image file is provided
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const testi = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!testi) {
      return res.status(404).json({ status: false, error: 'Testimonial not found' });
    }

    res.status(200).json({ status: true, data: testi });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// GET /api/cat/:id
exports.getTestimonial = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);

    if (!testi) {
      return res.status(404).json({ status: false, error: 'Testimonial not found' });
    }

    res.status(200).json({ status: true, data: testi });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


  