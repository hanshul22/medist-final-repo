const Contact = require('../model/Contact');

// GET /api/help
exports.getContactList = async (req, res) => {
    try {
  
      const contact = await Contact.findOne();
  
      res.status(200).json({ status: true, data: contact });
  
    } catch (err) {
  
      res.status(500).json({ status: false, error: 'Server Error' });
  
    }
  };
  exports.getVersion = async (req, res) => {
    try {
      // Find one document and select only the 'version' field
      const contact = await Contact.findOne().select('version');
      
      if (contact) {
        res.status(200).json({ status: true, message:"version fetched successfully", data: contact.version });
      } else {
        res.status(404).json({ status: false, error: 'version not found' });
      }
    } catch (err) {
      res.status(500).json({ status: false, error: 'Server Error' });
    }
  };
  
  
  // POST /api/help
  exports.createContact = async (req, res) => {
    try {
  
      const contact = await Contact.create(req.body);
  
      res.status(201).json({ status: true, data: contact });
  
    } catch (err) {
      res.status(400).json({ status: false, error: err.message });
    }
  };
  
  
  // PUT /api/help/:id
  exports.updateContact = async (req, res) => {
    try {
        // console.log(">>>",req.body)
      const contact = await Contact.findOneAndUpdate(req.body);
      if (!contact) {
        return res.status(404).json({ status: false, error: 'Contact not found' });
      }
      res.status(200).json({ status: true, data: contact });
    } catch (err) {
      res.status(400).json({ status: false, error: err.message });
    }
  };