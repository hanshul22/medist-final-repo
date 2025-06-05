const  mongoose = require('mongoose');


const invoiceSchema = new mongoose.Schema({
    
    name:{
        type:String,    
    },
    accountNo:{
        type:String,    
    },
    ifsc:{
        type:String,    
    },
    accountType:{
        type:String,    
    },
    image:{
        type:String,    
    },
    policy:{
        type:String,
    },
    status:{
        type:String,
        default:"Actice",
        enum:["Actice","Inactive"]
    }
   
},
  
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Invoice = mongoose.model('Invoice',invoiceSchema);

module.exports = Invoice;