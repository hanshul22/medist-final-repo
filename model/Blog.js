const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    tags: {
      type: [String], // Array of tags for better search & filtering
      default: [],
    },
    image: {
      type: String, // Store image URL or file path
    },
    blogStatus: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
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
});

module.exports = mongoose.model('BLog', blogSchema);
