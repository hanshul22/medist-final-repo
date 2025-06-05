const  mongoose = require('mongoose');


const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
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


const Testimonial = mongoose.model('Testimonial',testimonialSchema);

module.exports = Testimonial;