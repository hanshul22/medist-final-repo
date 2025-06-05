const  mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"plese provide title"]
    },
    message:{
        type:String,
        required:[true,"plese provide message"]
    },
    image:{
        type:String
    },
    linkUrl:{
        type:String
    },
    userFor:{
        type:String,
        default:"All",
        enum:["User","All"]
    
    },
    status:{
        type:String,
        default:"Active",
        enum:["Active","Inactive"]
    }
   
},
  
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Notification = mongoose.model('Notification',notificationSchema);

module.exports = Notification;