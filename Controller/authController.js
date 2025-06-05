const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Otp = require('../model/Otp');
const { sendSms } = require("../Util/smsSend");
const { signInToken, tokenForVerify } = require("../Util/auth");
var msg91 = require("@walkover/msg91")("434115Aw7JUjmXGpb672dc837P1", "WINJAT", "4");


exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { mobileOrEmail } = req.body;
    const user = await User.findOne({
      $or: [{ mobileNo: mobileOrEmail }, { email: mobileOrEmail }]
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




exports.register = async (req, res) => {
  try {
    const { name, email, mobileNo, password, userType, city, pincode, image } = req.body;

    // Check if a user with the same email or mobile number already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobileNo }] 
    });

    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      mobileNo,
      userType,
      city,
      pincode,
      image,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate authentication token
    const token = signInToken(newUser);

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message || "Server Error" });
  }
};

exports.logOut = async (req, res) => {
  try {
    if (req.user) {
      let user;
      
        user = await User.findById(req.user._id);

        if (user) {
          user.tokenVersion += 1;
          await user.save();
          res.json({ status: true, message: 'Logged out' });
        } else {
          res.status(401).json({ status: false, message: 'Invalid user' });
        }
      

    } else {
      res.status(401).json({ status: false, message: 'No token provided' });
    }

  } catch (error) {
    res.status(500).send()
  }
};

// exports.verifyOTPForSignUp = async (req, res) => {

//   try {
//     const { tokenOfUser, otp, fcmToken, imei, deviceType, deviceName, deviceIp } = req.body;

//     if (!tokenOfUser) {
//       return res.status(400).json({ error: 'Token must be provided.' });
//     }

//     // Decode the token to get the user details
//     const decoded = jwt.verify(tokenOfUser, process.env.JWT_SECRET_FOR_VERIFY);

//     // Add fcmToken, imei, and deviceType to decoded user data
//     decoded.fcmToken = fcmToken;
//     decoded.imei = imei;
//     decoded.deviceType = deviceType;
//     decoded.deviceName = deviceName;
//     decoded.deviceIp = deviceIp;

//     let user;

//     // Check if the OTP matches and the user type
//     if (decoded.otp == otp) {
      
    
//       user = await User.create(decoded);
//     } else {
//       return res.status(400).json({ error: 'Invalid OTP.' });
//     }

//     if (!user || !user._id) {
//       return res.status(500).json({ error: "User creation failed." });
//     }

//     const mobileNo = decoded.mobileNo;
//     const mobileNumber = `+91${mobileNo}`;;
//     const messageText = `Dear User, Thank you for registering with Winja Travels! Your account is successfully created. We will contact you shortly to assist with your travel plans. For assistance, contact us at 080-62179497, +91-7357507763.`;

//     msg91.send(mobileNumber, messageText, "1707173702163299461", function (err, response) {
//       if (err) {
//         console.error("Error sending message:", err);
//         return res.status(500).json({ status: false, message: 'Failed to send message. Please try again later.' });
//       }
//     });
//     const token = signInToken(user);

//     // Respond with the token and user details
//     res.status(200).json({
//       status: true,
//       message: 'OTP verified successfully',
//       token,
//       user
//     });
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ error: 'Internal Server Error.' });
//   }
// };


// exports.verifyOTP = async (req, res) => {
//   try {
//     const { mobileOrEmail, otp, userType } = req.body;
//     let user;
   
//       user = await User.findOne({
//         mobileNo: mobileOrEmail
//       });
    


//     if (!user) {
//       return res.status(404).json({ status: false, message: 'User not found' });
//     }

//     // Find the latest OTP for the user
//     const latestOTP = await Otp.findOne({ user: user._id }).sort({ createdAt: -1 });

//     if (!latestOTP || latestOTP.otpCode !== otp || latestOTP.expiresAt < new Date()) {
//       return res.status(403).json({ status: false, message: 'Invalid OTP' });
//     }
//     let loginStatus = true;
//     if (!user.userStatus) {
//       loginStatus = true
//       user.userStatus = true;
//     }
//     user.fcmToken = req.body.fcmToken;
//     user.imei = req.body.imei;
//     user.deviceType = req.body.deviceType;
//     user.deviceIp = req.body.deviceIp;
//     user.deviceName = req.body.deviceName;
//     user.tokenVersion += 1;
//     await user.save();
//     // OTP is valid, delete the OTP record
//     await Otp.deleteMany({ user: user._id });

//     const token = signInToken(user);
//     // You may want to use JWT or session management here to authenticate the user

//     res.status(200).json({ status: true, message: 'OTP verified successfully', token, user: user, userStatus: loginStatus });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.resendOTP = async (req, res) => {
//   try {
//     const { tokenOfUser } = req.body;

//     // Decode the existing token
//     const decoded = jwt.verify(tokenOfUser, process.env.JWT_SECRET_FOR_VERIFY);

//     // Extract the data, excluding the `exp` property
//     const { exp, ...userData } = decoded;
//     const { mobileNo, userType } = userData;

//     // Generate a new OTP // Generate new OTP
//     const otpCode = generateOTP();
//     // const mobileNumber = mobileNo;
//      // Send OTP to the user's mobile number using msg91
//      const mobileNumber = `+91${mobileNo}`;
//      const messageText = `Dear User, ${otpCode} is your one time verification code for Winja Travels App. Team Winja Travels.`;
//      //  const messageText = `Dear ${name}, your one-time verification code for Winja Travels App is ${otpCode}. This code is valid for 5 minutes.`;


//      msg91.send(mobileNumber, messageText, "1707173105333079191", function (err, response) {
//        if (err) {
//          console.error("Error sending OTP:", err);
//          return res.status(500).json({ status: false, message: 'Failed to send OTP. Please try again later.' });
//        }
//      });
//     // Add the new OTP to the existing data without the `exp` property
//     const newTokenData = { ...userData, otp: otpCode };

//     // Create a new token with the updated data
//     const newToken = tokenForVerify(newTokenData);

//     res.status(200).json({
//       status: true,
//       message: 'OTP resent successfully',
//       data: {
//         token: newToken,
//         otpCode // Only include this if necessary (e.g., for testing)
//       }
//     });

//   } catch (error) {
//     console.error('Error resending OTP:', error);
//     res.status(500).json({ status: false, error: error.message });
//   }
// };






function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

