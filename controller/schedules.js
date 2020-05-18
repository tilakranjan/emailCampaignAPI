"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
 */

const schedules = require("../models/schedules");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
    add: (sDates, cid, cb) => {
        for (let x of sDates) {
            let mObj = {}
            mObj.date = parseInt(x.date.split("/")[1]);
            mObj.month = parseInt(x.date.split("/")[0]);
            mObj.year = parseInt(x.date.split("/")[2]);
            mObj.time = x.time;
            mObj.campaignId = cid;

            new schedules(mObj)
                .save()
                .then(mongoRes => {
                    if (mongoRes.length == 0) {
                        console.log(false);
                    } else {
                        console.log(mongoRes._id);
                    }
                })
                .catch(err => {
                    console.log(false);
                });
        }
        cb(true);
    },

    getAgg: (q, cb) => {
        schedules.aggregate([
            { $match: q },

            {
                $addFields: {
                    coid: { $toObjectId: "$campaignId" }
                }
            },

            {
                $lookup: {
                    from: "campaigns",
                    localField: "coid",
                    foreignField: "_id",
                    as: "campaign"
                }
            },

            { $unwind: "$campaign" }

        ])
            .then(mongoRes => {
                cb(mongoRes);
            });
    },

};
