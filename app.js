const express = require('express');
const ejs = require('ejs');
const errorHandler = require('./Controller/errorController')
const cors = require('cors');
const path = require('path');
const authRouter = require('./Router/authRoutes');
const appPolicyRouter = require('./Router/appPolicyRoutes');
const contactRouter = require('./Router/contactRoutes');
const adminRouter = require('./Router/adminRoutes');
const notificationRouter = require('./Router/notificationRoutes');
const userRouter = require('./Router/userRoutes');
const offerBannerRouter = require('./Router/offerBannerRoutes');
const BlogRouter = require('./Router/blogRoutes');
const ServiceRouter = require('./Router/serviceRoutes');



const app = express();
app.use(cors({
    origin: "*"
}));
app.set("trust proxy");

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));
app.use('/Img', express.static(path.join(__dirname, '..', 'Img')));



//app.use('/upload', express.static('upload'));
app.use(express.json());


console.log("app js file")

app.use(errorHandler);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/app', appPolicyRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/banner', offerBannerRouter);
app.use('/api/v1/blog', BlogRouter);
app.use('/api/v1/service', ServiceRouter);



module.exports = app;