require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const User = require("../model/User");




const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
      userType: user.userType,
      tokenVersion: user.tokenVersion
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "60d",
    }
  );
};
// const signInToken = async (user) => {
//   // Generate a token
//   const token = jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       phone: user.phone,
//       image: user.image,
//       userType: user.userType,
//       tokenVersion: user.tokenVersion
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "60d",
//     }
//   );

//   // Update the currentToken field in the database
//   await User.findByIdAndUpdate(user._id, { currentToken: token, tokenVersion: user.tokenVersion + 1 });

//   return token;
// };

const tokenForVerify = (user) => {
  return jwt.sign(
    user,
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15m" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ status: false, message: 'Authorization header missing' });
  }
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.userType === 'Admin') {
      req.user = decoded;
      return next();
    }
    let user;
   
      user = await User.findById(decoded._id);


    if (user && user.status === 'Inactive') {
      return res.status(401).json({ status: false, message: 'User account is inactive' });
    }
    
    if (user && user.tokenVersion === decoded.tokenVersion) {
      req.user = decoded;
      return next();
    } else {
      return res.status(401).json({ status: false, message: 'Invalid token' });
    }
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Please login again', error: err.message });
  }
};

module.exports = isAuth;

const isAdmin = async (req, res, next) => {
  
  const { authorization } = req.headers;
  try {
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findById(decoded._id);
  // console.log('.>>>',decoded);
  
  if (admin) {
    //console.log("admin2")
    req.user = admin;
    next();
  } else {
    res.status(401).send({
      status: false,
      message: "User is not Admin",
    });
  }
} catch (err) {
  res.status(401).send({
    message:"Please Login First",
  });
}
};

const sendNotification = async (token, message) => {
  const payload = {
    notification: {
      title: message.title,
      body: message.body
    },
    token: token
  };

  try {
    const response = await admin.messaging().send(payload);
    // console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.log('Error sending message:', error);
    throw error;
  }
};


module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  sendNotification
};
