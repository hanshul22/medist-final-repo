const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
    console.log(err.name,err.message);
    console.log('UNHANDLED EXCEPTION ! SHUTTING DOWN.....');
    process.exit(1);
});


dotenv.config({path:'./confing.env'}); 

const app = require('./app');

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,})
.then(con =>{
    console.log('MongoDB connected');
})

// mongoose.connect(process.env.DATABASE_LIVE_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));



const server = app.listen(process.env.PORT , ()=>{
    console.log(`app is running on Port`,process.env.PORT) 
    

})

process.on('unhandledRejection', err => {
    console.log(err.name,err);
    console.log('UNHANDLED REJECTION ! SHUTTING DOWN.....');
    server.close(()=>{
        process.exit(1);
    });
});
