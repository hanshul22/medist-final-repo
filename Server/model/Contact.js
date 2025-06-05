const  mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    
    phone:{
        type:String,    
    },
    email:{
        type:String,    
    },
    whatsApp:{
        type:String,    
    },
    version:{
        type:String,    
    },
    faceBook:{
        type:String
    },  
    linkedin:{
        type:String
    },
    instagram:{
        type:String
    },
    twitter:{
        type:String
    },
    pintrest:{
        type:String
    },
    youtube:{
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


const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;