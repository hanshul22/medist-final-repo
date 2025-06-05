const { signInToken, tokenForVerify } = require("../Util/auth");
const Admin = require('../model/Admin');
const User = require('../model/User');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email, mobileNo, userType, city, pincode, image, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new Admin({ name, email, mobileNo, userType, city, pincode, image, password: hashedPassword });
     
      await newUser.save();
  
      const token = signInToken(newUser);
      
      res.status(201).json({ message: 'User registered successfully',token });
  
    } catch (error) {
  
      res.status(500).json({ error: error.message });
  
    }
  }

  exports.login = async (req, res) => {
    try {
      // console.log(req.body);
      const { email } = req.body;
      const user = await Admin.findOne({
        $or: [{ mobileNo: email }, { email: email }]
      }).select('+password');
  
      // console.log(user)
  
      if (!user) {
        return res.status(201).json({ status: false , error: 'User not found' });
      }
      if (user.status !== 'Active') {
        return res.status(403).json({
          status: false,
          message: 'Account is not active. Please contact the team to activate your account.'
        });
      }  
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
          return res.status(201).json({ status: false, error: 'Invalid Password' });
      }
      
      const token = signInToken(user);    
  
      res.status(200).json({status: true , message: 'login successfully',token ,data:user});
    } catch (error) {
      res.status(500).json({status: true , error: error.message });
    }
  };
  
  exports.createAdmin =async (req, res) => {
    
    try {
      // console.log("req.body data",req.body);
      
      const { name, email, mobileNo, userType, state, role,status, password, } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Admin({ name, email, mobileNo,status, userType, state,  role,  password: hashedPassword });
     
      await newUser.save();

      res.status(200).json(newUser);

    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error)
    } 

  }

  exports.getAllAdmin =async (req, res) => {
    try {
      // console.log(req.user)
      const users = await Admin.find({ _id: { $ne: req.user._id } })
    
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, message: 'user Fetched successfully',  data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

  exports.getSingleAdmin =async (req, res) => {
    try {
      const users = await Admin.findById(req.params.id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  }

  exports.updateAdmin = async (req, res) => {
    try {
      req.body.image = `Uploads/${req.file?.filename}`;
      const { id } = req.params;
      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        req.body.password = hashedPassword;
      }
      const updatedUser = await Admin.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 

  exports.deleteAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      await Admin.findByIdAndDelete(id);
      res.status(200).json({ status: true, data: {} });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.changePassword = async (req, res) => {
    try {
      const id  = req.user._id;

      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Please Provide Details' });
      }

      const user = await Admin.findById(id).select('+password');;
      
      // console.log(user)

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
          return res.status(400).json({ error: 'Invalid old password' });
      }
      
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

      res.status(200).json(user);

    } catch (error) {

      res.status(500).json({ error: error.message });

    }
  }

  exports.forgetPassword = async (req, res) => {
  try {
    
    const { email } = req.body;
    const user = await Admin.findOne({
      $or: [{ mobileNo: email }, { email: email }]
    });

    // console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
  }

  exports.updateMe = async (req, res) => {
    try {
      if (req.file) {
        req.body.image = `Uploads/${req.file.filename}`;
      }
      // console.log(req.body)

      const user = await Admin.findByIdAndUpdate(req.user._id, req.body, {
        new: true,  });
  
      res.status(200).json(user);
  
    } catch (error) {
  
      res.status(500).json({ error: error.message });
  
    }
  }

  exports.me = async (req, res) => {
      try {
  
        // console.log("user")
        

        const user = await Admin.findById(req.user._id) 
        .sort({ createdAt: -1 });

        res.status(200).json(user);
    
      } catch (error) {
    
        res.status(500).json({ error: error.message });
    
      }
      
  }


  
  
  
  
  
