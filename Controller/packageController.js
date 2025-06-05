const Package = require("../model/Package");
const Category = require("../model/Category");
const Notification = require("../model/Notification");
const Banner = require("../model/OfferBanner");

// ✅ Get All Packages (Sorted by Latest)
exports.getAllPackage = async (req, res) => {
  try {
    const packages = await Package.find().populate('service').populate('category').sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: packages });
  } catch (err) {
    res.status(500).json({ status: false, error: "Server Error" });
  }
};
exports.getAllWebPackage = async (req, res) => {
  try {
    const packages = await Package.find({status:"Active"}).populate('service').populate('category').sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: packages });
  } catch (err) {
    res.status(500).json({ status: false, error: "Server Error" });
  }
};
exports.getAllPopularPackage = async (req, res) => {
  try {
    const packages = await Package.find({ status: "Active", popular: true }) // Fixed typo
      .populate("service")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: packages });
  } catch (err) {
    console.error("Error fetching popular packages:", err);
    res.status(500).json({ status: false, error: "Server Error" });
  }
};
exports.getAllPackageBYCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Category ID ko request parameters se le rahe hain

    if (!categoryId) {
      return res.status(400).json({ status: false, error: "Category ID is required" });
    }

    const packages = await Package.find({ status: "Active", category: categoryId }) 
      .populate("service")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: packages });
  } catch (err) {
    console.error("Error fetching packages by category:", err);
    res.status(500).json({ status: false, error: "Server Error" });
  }
};

exports.searchTitleByPackage = async (req, res) => {
  try {
    const { title } = req.query; // Query se title le rahe hain

    if (!title) {
      return res.status(400).json({ status: false, error: "Title is required for search" });
    }

    const packages = await Package.find({
      status: "Active",
      title: { $regex: title, $options: "i" }, // Case-insensitive search
    })
      .populate("service")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: packages });
  } catch (err) {
    console.error("Error searching package by title:", err);
    res.status(500).json({ status: false, error: "Server Error" });
  }
};

// ✅ Create New Package
exports.createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json({ status: true, data: newPackage });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// ✅ Update Package by ID
exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, // ID from URL
      req.body, // Updated Data
      { new: true, runValidators: true } // Return updated doc & apply validations
    );

    if (!updatedPackage) {
      return res.status(404).json({ status: false, error: "Package not found" });
    }

    res.status(200).json({ status: true, data: updatedPackage });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// ✅ Get Package by ID
exports.getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id).populate('service').populate('category');

    if (!packageData) {
      return res.status(404).json({ status: false, error: "Package not found" });
    }

    res.status(200).json({ status: true, data: packageData });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// ✅ Delete Package by ID
exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ status: false, error: "Package not found" });
    }

    res.status(200).json({ status: true, message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, error: "Server Error" });
  }
};
exports.homePackage = async (req, res) => {
  try {
    const packageData = await Package.find({ popular: true })
      .populate("service")
      .populate("category")
      .sort({ createdAt: -1 });

    const categoryData = await Category.find({ status: "Active" }).sort({ createdAt: -1 });
    const bannerData = await Banner.find({ status: "Active" }).sort({ createdAt: -1 });
    const activeNotificationCount = await Notification.countDocuments({ status: "Active" });

    res.status(200).json({
      status: true,
      data: {
        package: packageData,
        category: categoryData,
        banner: bannerData,
        notificationCount: activeNotificationCount, // Notification count added here
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
