"use strict";
/**
 *@author Tilak
 *@since May 17, 2020
 */

var mongoose = require("mongoose");

var newSchema = {
    senderName: { type: String, trim: true },
    senderEmail: { type: String, lowercase: true, trim: true },
    emailTo: [{ type: String, lowercase: true, trim: true }],
    emailSubject: { type: String, trim: true },
    emailBody: { type: String, trim: true },
    emailSchedule: [],
    createdOn: Date,
};
module.exports = mongoose.model("campaign", newSchema);
