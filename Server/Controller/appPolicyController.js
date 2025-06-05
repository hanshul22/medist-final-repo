const AppPolicy = require("../model/AppPolicy");


exports.getAppPolicy = async (req, res) => {
  try {
    const appPolicy = await AppPolicy.find();
    // console.log(req.query.data)
    if (req.query.data == "privacyPolicy") {
      res.status(200).json({
        status: true,
        message: "AppPolicy fetched successfully",
        data: {
          English: appPolicy[0].privacyPolicy,
          Title: appPolicy[0].privacyPolicyTitle
        }
      })
    } else if (req.query.data == "termsAndCondition") {

      res.status(200).json({
        status: true,
        message: "AppPolicy fetched successfully",
        data: {
          English: appPolicy[0].termsAndCondition,
          Title: appPolicy[0].termsAndConditionTitle
        },
      });
    }else if (req.query.data == "about") {

        res.status(200).json({
          status: true,
          message: "AppPolicy fetched successfully",
          data: {
            English: appPolicy[0].about,
            Title: appPolicy[0].aboutTitle
          },
        });
      }
     else {
      res.status(200).json({
        status: true,
        message: "AppPolicy fetched successfully",
        data: {
          English: appPolicy[0].cancelPolicy,
          Title: appPolicy[0].cancelPolicyTitle
        },
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Server Error",
      message: err.message
    });
  }
}

exports.updateAppPolicy = async (req, res) => {
  try {   
    const appPolicy = await AppPolicy.findOne();  
    if (!appPolicy) {
      return res.status(404).json({
        status: false,
        message: "AppPolicy not found",
      });
    }
    // Update the fields based on the data type in the request
    if (req.body.data === "privacyPolicy") {
      appPolicy.privacyPolicy = req.body.privacyPolicy || appPolicy.privacyPolicy;
      appPolicy.privacyPolicyTitle = req.body.privacyPolicyTitle || appPolicy.privacyPolicyTitle;
    } else if (req.body.data === "termsAndCondition") {
      appPolicy.termsAndCondition = req.body.termsAndCondition || appPolicy.termsAndCondition;
      appPolicy.termsAndConditionTitle = req.body.termsAndConditionTitle || appPolicy.termsAndConditionTitle;
    }else if (req.body.data === "about") {
        appPolicy.about = req.body.about || appPolicy.about;
        appPolicy.aboutTitle = req.body.aboutTitle || appPolicy.aboutTitle;
      }
     else if (req.body.data === "cancelPolicy") {
      appPolicy.cancelPolicy = req.body.cancelPolicy || appPolicy.cancelPolicy;
      appPolicy.cancelPolicyTitle = req.body.cancelPolicyTitle || appPolicy.cancelPolicyTitle;
    }

    // Save the updated policy
    await appPolicy.save();

    res.status(200).json({
      status: true,
      message: "AppPolicy updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.createAppPolicy = async (req, res) => {
  try {
    const appPolicy = await AppPolicy.create(req.body);
    res.status(201).json({
      status: true,
      message: "AppPolicy created successfully",
      data: appPolicy,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Server Error",
      message: err.message
    });
  }
};





