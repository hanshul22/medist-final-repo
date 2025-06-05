const  mongoose = require('mongoose');


const offerBannerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"plese provide title"]
    },
    image:{
        type:String,
        // required:[true,"plese provide image"]
    },
    link:{
        type:String  
    },
    
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
      },
   
},
  
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const OfferBanner = mongoose.model('OfferBanner',offerBannerSchema);

module.exports = OfferBanner;