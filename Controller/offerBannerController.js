const Banner = require('../model/OfferBanner');
const fs = require('fs');
const path = require('path');

// GET /api/banner
exports.getAllBanner = async (req, res) => {
  try {
    let filter = {};

    // For non-admin users, filter by status and user type (if applicable)
    if (req.user.userType !== 'Admin') {
      filter.status = "show"; 
    }

    const banners = await Banner.find(filter).sort({ createdAt: -1 }); // Sort by createDate
    res.status(200).json({ status: true, data: banners });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

// POST /api/banner
exports.createBanner = async (req, res) => {
  try {
   
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const banner = await Banner.create(req.body);
    res.status(201).json({ status: true, data: banner });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// DELETE /api/banner/:id
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ status: false, error: 'Banner not found' });
    }

    if (banner.image) {
        // Construct the image path relative to the project directory
        const imagePath = path.join(__dirname, '../Uploads', path.basename(banner.image));
  
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
      await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};



// PUT /api/banner/:id
exports.updateBanner = async (req, res) => {
  try {
    // Check if an image file is provided
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!banner) {
      return res.status(404).json({ status: false, error: 'Banner not found' });
    }

    res.status(200).json({ status: true, data: banner });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// GET /api/banner/:id
exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ status: false, error: 'Banner not found' });
    }

    res.status(200).json({ status: true, data: banner });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.getAllBannersByEndDate = async (req, res) => {
    try {
      const currentDate = new Date();
  
      let filter = {
        $or: [
          { endDate: { $gte: currentDate } }, // Banners with future end date
          { endDate: null } // Banners with no end date
        ]
      };
  
      // Add status filter for non-admin users
      if (req.user.userType !== 'Admin') {
        filter.status = 'show';
        // filter.userFor = req.user.userType;
      }
  
      const banners = await Banner.find(filter).sort({ createdAt: -1 });
  
      res.status(200).json({ status: true, data: banners });
    } catch (err) {
      res.status(500).json({ status: false, error: 'Server Error' });
    }
  };

  exports.getWebAllBannersByEndDate = async (req, res) => {
    try {
      const currentDate = new Date();
  
      // Define the filter for banners with future end date or no end date
      let filter = {
        $or: [
          { endDate: { $gte: currentDate } }, // Banners with future end date
          { endDate: null } // Banners with no end date
        ]
      };
  
      // Use the filter in the find method and ensure 'find' is correctly spelled
      const banners = await Banner.find({ ...filter, status: 'show' }).sort({ createdAt: -1 });
  
      res.status(200).json({ status: true, data: banners });
    } catch (err) {
      res.status(500).json({ status: false, error: 'Server Error' });
    }
  };
  