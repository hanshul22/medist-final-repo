const  mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"plese provide title"]
    },
    image:{
        type:String,
        // required:[true,"plese provide image"]
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


const Category = mongoose.model('Category',categorySchema);

module.exports = Category;