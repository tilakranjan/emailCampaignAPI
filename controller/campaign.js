"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
 */

const campaign = require("../models/campaign");

module.exports = {
  add: (cData, cb) => {
    new campaign(cData)
      .save()
      .then(mongoRes => {
        if (mongoRes.length == 0) {
          cb(false);
        } else {
          cb(mongoRes._id);
        }
      })
      .catch(err => {
        cb(false);
      });
  }
};
