const User = require("../model/User");

const UserReport = require("../model/UserReport");


exports.createUser = async (req, res) => {
  try {

    const oldUser = await User.findOne({
      $or: [{ mobileNo: req.body.mobileNo }, { email: req.body.email }]
    });

    if (oldUser) {
      return res.status(400).json({
        status: false,
        message: 'User already exists'
      });
    }

    const user = await User.create(req.body);
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: user
    })

  } catch (err) {
    res.status(500).send()
  }
}

exports.updateUser = async (req, res) => {
  try {
    // console.log("body",req.body)
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: user
    })
  } catch (err) {
    res.status(500).send()
  }
}



exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "All user",
      data: users
    })

  } catch (err) {
    res.status(500).send()
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user
    })
  } catch (err) {
    res.status(500).send()
  }
}



exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "user deleted successfully",
      data: user
    })
  } catch (err) {
    res.status(500).send()
  }
}



exports.getMyProfile = async (req, res) => {
  try {
    // console.log(req.user)

    const user = await User.findById(req.user._id);
    res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user
    })

  } catch (err) {
    res.status(500).send()
  }
}

exports.updateMe = async (req, res) => {
  try {

    let updatedUser;


    // If a new image is uploaded, update the image field
    if (req.file) {
      req.body.image = `Uploads/${req.file.filename}`;
    }
    // Update the normal User
    updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });


    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: `${req.user.userType} updated successfully`,
      data: updatedUser
    });
    // console.log("Updated user data:", updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

exports.getUniqueCities = async (req, res) => {
  try {
    // Fetch distinct cities from the User table
    let cities = await User.distinct("city");

    // Convert city names to have the first letter capitalized (ucwords equivalent)
    cities = cities.map(city =>
      city.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    );

    res.status(200).json({
      status: true,
      message: "Unique cities fetched successfully",
      data: cities
    });
  } catch (err) {
    console.error('Error fetching unique cities:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};


exports.getAllUserReport = async (req, res) => {
  try {
    let filter = {};

    // For non-admin users, filter by status and user type (if applicable)
    if (req.user.userType !== 'Admin') {
      filter.status = "Active";
    }

    const report = await UserReport.find(filter).sort({ createdAt: -1 }); // Sort by createDate
    res.status(200).json({ status: true, data: report });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};

exports.createUserReport = async (req, res) => {
  try {

    // Check if a file is uploaded
    if (req.files && req.files.report && req.files.report.length > 0) {
      req.body.report = `Uploads/${req.files.report[0].filename}`; // Store only one file as a string
    } else {
      return res.status(400).json({ status: false, message: "Report file is required" });
    }


    const report = await UserReport.create(req.body);
    res.status(201).json({ status: true, data: report });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message || "server error", error: err.message });
  }
};


exports.deleteUserReport = async (req, res) => {
  try {
    const report = await UserReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ status: false, message: 'Report not found' });
    }

    await UserReport.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Server Error' });
  }
};



exports.updateUserReport = async (req, res) => {
  try {
    if (req.files && req.files.report && req.files.report.length > 0) {
      req.body.report = `Uploads/${req.files.report[0].filename}`; // Store only one file as a string
    }

    const report = await UserReport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!report) {
      return res.status(404).json({ status: false, message: 'Report not found' });
    }

    res.status(200).json({ status: true, data: report });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message || "server error", error: err.message });
  }
};


exports.getUserReport = async (req, res) => {
  try {
    const report = await UserReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ status: false, error: 'Report not found' });
    }

    res.status(200).json({ status: true, data: report });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};
























