"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
 */

var mongoose = require("mongoose");

var newSchema = {
    date: { type: Number },
    month: { type: Number },
    year: { type: Number },
    time: { type: String, trim: true },
    campaignId: { type: String, trim: true },
    mailed: false
};
module.exports = mongoose.model("schedules", newSchema);
