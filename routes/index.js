"use strict";
/**
 *@author Tilak
 *@since May 17, 2020
 */

const ecampaign = require("./ecampaign");

const routes = app => {
    ecampaign(app);
};
module.exports = routes;
