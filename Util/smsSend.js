const axios = require('axios');

const apiKey = '434115Aw7JUjmXGpb672dc837P1';
// const userName = 'WinjaTravel';
const senderID = 'WINJAT';
const entityId = '1701172957580599344';
const unicode = 'false';

const sendSms = async (mobileNumber, templateId, messageText) => {
   const url = `https://loadcrm.com/SmsApi/api/OwnApi/SendSms?key=${apiKey}&SenderID=${senderID}&EntityId=${entityId}&TemplateId=${templateId}&Unicode=${unicode}&MobileNo=${mobileNumber}&MessageText=${encodeURIComponent(messageText)}`;

    // Log the URL for debugging
    console.log('Sending SMS with URL:', url);
  try {
    const response = await axios.get(url);
    console.log('SMS sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.data : error.message);
  }
};

module.exports = {
  sendSms
};
