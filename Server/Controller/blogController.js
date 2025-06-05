const Blog = require('../model/Blog');
const fs = require('fs');
const path = require('path');


exports.getAllBlog = async (req, res) => {
  try {
    let filter = {};

    // For non-admin users, filter by status and user type (if applicable)
    if (req.user.userType !== 'Admin') {
      filter.status = "Active"; 
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 }); // Sort by createDate
    res.status(200).json({ status: true, data: blogs });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

exports.createBlog = async (req, res) => {
  try {
   
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const blog = await Blog.create(req.body);
    res.status(201).json({ status: true, data: blog });
  } catch (err) {
    res.status(400).json({ status: false,message:err.message|| "server error", error: err.message });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ status: false, error: 'Blog not found' });
    }

    if (blog.image) {
        // Construct the image path relative to the project directory
        const imagePath = path.join(__dirname, '../Uploads', path.basename(blog.image));
  
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
      await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};




exports.updateBlog = async (req, res) => {
  try {
    // Check if an image file is provided
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!blog) {
      return res.status(404).json({ status: false, error: 'Blog not found' });
    }

    res.status(200).json({ status: true, data: blog });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};


exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ status: false, error: 'Blog not found' });
    }

    res.status(200).json({ status: true, data: blog });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


  