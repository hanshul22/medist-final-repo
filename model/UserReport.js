const mongoose = require('mongoose');

const userReportSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    report:{
        type: String,
        required: true
        },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Inactive']
    },
     

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});






module.exports = mongoose.model('UserReport', userReportSchema);
