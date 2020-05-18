"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
 */

const nodemailer = require("nodemailer");
const config = require("./config");
let transporter = nodemailer.createTransport(config.mailSettings);

const sendEmail = (mObj) => {
  let mailOptions = {
    from: mObj.from, 
    to: mObj.to, // list of receivers
    subject: mObj.sub, // Subject line
    text: mObj.body // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Mail sent......");
    }
  });
};

module.exports = sendEmail;
