const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPackageSchema = new Schema({
  package: {
    type: Schema.Types.ObjectId,
    ref: 'Package',  // References the Package model
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',  // References the Booking model
    required: true,
  },

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('UserPackage', userPackageSchema);
