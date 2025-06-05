const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Download this file from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://127.0.0.1:27017/pashu12' // Replace with your database URL
});

// const sendNotification = async (token, message) => {
//   const payload = {
//     notification: {
//       title: message.title,
//       body: message.body
//     },
//     token: token
//   };

//   try {
//     const response = await admin.messaging().send(payload);
//     console.log('Successfully sent message:', response);
//     return response;
//   } catch (error) {
//     console.log('Error sending message:', error);
//     throw error;
//   }
// };

// // POST /send-notification
// app.post('/send-notification', async (req, res) => {
//   const { token, message } = req.body;

//   try {
//     const response = await sendNotification(token, message);
//     res.status(200).json({ status: true, response });
//   } catch (error) {
//     res.status(500).json({ status: false, error: error.message });
//   }
// });




module.exports = admin;


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: "AIzaSyALpVzQ0bEiiCx9QxXDGbzYirJIkpxFM_g",
//   authDomain: "pashuchikitsa-9eeab.firebaseapp.com",
//   projectId: "pashuchikitsa-9eeab",
//   storageBucket: "pashuchikitsa-9eeab.appspot.com",
//   messagingSenderId: "203847005080",
//   appId: "1:203847005080:web:b6373ea1087211b9d5b1ed",
//   measurementId: "G-GCK9HCSG2C"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// another code
// firebase.js