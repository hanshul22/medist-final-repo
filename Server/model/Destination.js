const  mongoose = require('mongoose');


const destinationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"plese provide title"]
    },
    image:{
        type:String
    },
    linkUrl:{
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


const Destination = mongoose.model('Destination',destinationSchema);

module.exports = Destination;