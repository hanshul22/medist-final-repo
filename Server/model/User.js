const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String
    },
    mobileNo: {
        type: Number,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:[true,'plese provide password'],
        select: false
    },
    imei: {
        type: String,
       
    },
    deviceType:{
        type: String,
    },
    deviceName:{
        type: String,
    },
    deviceIp:{
        type: String,
    },
    address: {
       type: String,
      
    },
    
    state:{
        type:String,
      
    },
    district: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },

    age: {
        type: Number   
    },
    other:{
        type: String,
    },
    
    image: {
        type: String
    },
    fcmToken: {
        type: String
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Inactive']
    },
     userType: {
        type: String,
        default: 'User'
    },
    userStatus: {
        type: Boolean,
        default: false
    },
    currentToken: { 
        type: String,
        default: null
    },
    tokenVersion :{
        type:Number,
        default:0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



// userSchema.index({ addressCordinates: "2dsphere" });


module.exports = mongoose.model('User', userSchema);
