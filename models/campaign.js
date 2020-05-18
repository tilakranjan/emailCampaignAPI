"use strict";
/**
 *@author Tilak
 *@since May 17, 2020
 */

var mongoose = require("mongoose");

var newSchema = {

    updatedOn: Date,
    createdOn: Date,
};
module.exports = mongoose.model("campaign", newSchema);
