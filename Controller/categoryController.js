const Category = require('../model/Category');
const fs = require('fs');
const path = require('path');

// GET /api/cat
exports.getAllCategory = async (req, res) => {
  try {
    let filter = {};

    // For non-admin users, filter by status and user type (if applicable)
    if (req.user.userType !== 'Admin') {
      filter.status = "Active"; 
    }

    const cat = await Category.find(filter).sort({ createdAt: -1 }); // Sort by createDate
    res.status(200).json({ status: true, data: cat });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

exports.getAllWebCategory = async (req, res) => {
    try {
      
  
      const cat = await Category.find({status:"Active"}).sort({ createdAt: -1 }); // Sort by createDate
      res.status(200).json({ status: true, data: cat });
    } catch (err) {
      res.status(500).json({ status: false, error: 'Server Error' });
    }
  };
// POST /api/cat
exports.createCategory = async (req, res) => {
  try {
   
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const cat = await Category.create(req.body);
    res.status(201).json({ status: true, data: cat });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// DELETE /api/cat/:id
exports.deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ status: false, error: 'Category not found' });
    }

    if (cat.image) {
        // Construct the image path relative to the project directory
        const imagePath = path.join(__dirname, '../Uploads', path.basename(cat.image));
  
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
      await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};



// PUT /api/cat/:id
exports.updateCategory = async (req, res) => {
  try {
    // Check if an image file is provided
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!cat) {
      return res.status(404).json({ status: false, error: 'Category not found' });
    }

    res.status(200).json({ status: true, data: cat });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// GET /api/cat/:id
exports.getCategory = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);

    if (!cat) {
      return res.status(404).json({ status: false, error: 'Category not found' });
    }

    res.status(200).json({ status: true, data: cat });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


  