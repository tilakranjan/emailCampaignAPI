"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
 */

const campaign = require("../models/campaign");
const ObjectId = require("mongodb").ObjectID;

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
  },

  get: (cData, cb) => {
    campaign.find({ _id: ObjectId(cData.campaignId), senderEmail: cData.senderEmail }, {_id:0, __v:0}, (err, mongoRes) => {
        if (err) {
            console.log("err")
            console.log(err)
            cb(false);
        } else {
            console.log(mongoRes);
            cb(mongoRes);
        }
    });
},
};
