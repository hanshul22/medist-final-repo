const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    service: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    offerPrice: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      default: "Both",
    },
    age: {
      type: String,
      trim: true,
    },
    reportTime: {
      type: String,
      trim: true,
    },
    fastingTime:{
        type:String,
    },
    popular:{
      type:Boolean,
      default:false
    },
    include: [
      {
        test: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Package", packageSchema);
