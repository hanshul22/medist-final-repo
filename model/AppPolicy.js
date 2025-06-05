const  mongoose = require('mongoose');


appPolicySchema = new mongoose.Schema({
    privacyPolicy:{
        type:String,
    },
    termsAndCondition:{
        type:String
    },
    cancelPolicy:{
        type:String
    },
    cancelPolicyTitle:{
        type:String
    },
    about:{
        type:String
    },
    aboutTitle:{
        type:String
    },
    termsAndConditionTitle:{
        type:String
    },
    privacyPolicyTitle:{
        type:String
    },
    status:{
        type:String,
        default:"show",
        enum:["show","hide"]
    }
   
},
  
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const AppPolicy = mongoose.model('AppPolicy',appPolicySchema);

module.exports = AppPolicy;