const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

class FirebaseAdmin {
  static instance;

  constructor(firebaseAdmin) {
    this.admin = firebaseAdmin;
  }

  static initialize() {
    if (this.instance) throw new Error('Instance already initialized.');

    let serviceAccount;

    // Check if we're in production/deployment environment
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Use environment variable in production
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
      // Use local file in development (fix the filename case)
      const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json');
      if (fs.existsSync(serviceAccountPath)) {
        serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      } else {
        throw new Error('Service account key not found. Please ensure serviceAccountKey.json exists or set FIREBASE_SERVICE_ACCOUNT environment variable.');
      }
    }

    const adminConfig = {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || "https://your-database-url.firebaseio.com"  // Use environment variable
    };

    admin.initializeApp(adminConfig);
    this.instance = new FirebaseAdmin(admin);
  }

  static getInstance() {
    if (!this.instance) throw new Error('Instance needs to be initialized first.');

    return this.instance;
  }

  // sendMulticastMessaging(tokens, title, body, data) {
  //   return this.admin.messaging().sendMulticast({
  //     data,
  //     notification: { title, body },
  //     tokens,
  //   });
  // }

  // sendMulticastMessaging(tokens, title, body, data) {
  //   const promises = tokens.map(token =>
  //     this.admin.messaging().send({
  //       data,
  //       notification: { title, body },
  //       token,
  //     })
  //   );
  
  //   return Promise.all(promises);
  // }
  sendMulticastMessaging(tokens, title, body) {
    const promises = tokens.map(token =>
      this.admin.messaging().send({
        notification: { title, body },
        token,
      })
    );
    return Promise.all(promises);

  }

  sendSingleMessaging(token, title, message) {
    // console.log(token);
    const promises = this.admin.messaging().send({
        notification: { title: title, body: message },
        token,
      })
    return promises;
  }
}

module.exports = FirebaseAdmin;

