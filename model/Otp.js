const  mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        // required:[true,"plese provide user id"]
    },
    otpCode:{
        type:String,
        required:[true,"plese provide otp code"],
    },
    expiresAt:{
        type:String,
        required:[true,'plese provide time']
    },
   
},
  
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Otp = mongoose.model('Otp',otpSchema);

module.exports = Otp;