"use strict";
/**
 *@author Tilak
 *@since May 17, 2020
 */

let express = require("express")
    , router = express.Router()
    , helpers = require("../lib/utils")
    , Joi = require("@hapi/joi")
    , controllers = require("../controller/index")
    , mailer = require("../lib/mailer")
    ;

router.get("/", (req, res, next) => {
    helpers.resSuccess(res, { msg: "hello" });
});

router.post("/check", (req, res, next) => {
    var postData = req.body;

    var schema = Joi.object({
        campaignId: Joi.string().required(),
        senderEmail: Joi.string().required(),
    });

    try {
        let validation = schema.validate(postData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        controllers.campaign.get(
            postData,
            ures => {
                if (ures) {
                    helpers.resSuccess(res, {
                        campaignId: postData.campaignId,
                        message: "Your campaign details are as follows.",
                        data: ures[0]
                    });
                }
                else {
                    helpers.resError(res, { message: "Invalid request." }, true, null);
                }
            }
        );

    } catch (e) {
        helpers.resError(res, e, true, null);
    }

});

router.post("/add", (req, res, next) => {
    var postData = req.body;

    var schema = Joi.object({
        senderName: Joi.string().required(),
        senderEmail: Joi.string().required(),
        emailTo: Joi.array().items(Joi.string()).required(),
        emailSubject: Joi.string().required(),
        emailBody: Joi.string().required(),
        emailSchedule: Joi.array().items(Joi.object().keys({
            date: Joi.string().required(),
            time: Joi.string().required()
        })).required(),
    });

    try {
        let validation = schema.validate(postData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        postData.createdOn = new Date();
        controllers.campaign.add(
            postData,
            ures => {
                if (ures) {
                    // call to add schedules.
                    controllers.schedules.add(
                        postData.emailSchedule,
                        ures,
                        sres => {
                            console.log(sres);
                        }
                    );

                    helpers.resSuccess(res, {
                        campaignId: ures,
                        message: "Please note you campaign id for further queries.",
                        data: postData
                    });
                }
                else {
                    helpers.resError(res, { message: "Something went wronge." }, true, null);
                }
            }
        );

    } catch (e) {
        helpers.resError(res, e, true, null);
    }

});

router.get("/runCampaign", (req, res, next) => {
    console.log('@Run Campaign...');

    let d = new Date();
    console.log(d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " -- " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());

    controllers.schedules.getAgg(
        {
            // date: 30
            date: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            time: d.getHours() + ":" + d.getMinutes()
        },
        mres => {
            console.log(mres);
            if (mres.length > 0) {
                for (let x of mres) {
                    // call mailer
                    mailer({
                        from: x.campaign.senderName + " <" + x.campaign.senderEmail + ">",
                        to: x.campaign.emailTo,
                        sub: x.campaign.emailSubject,
                        body: x.campaign.emailBody
                    });
                }
            }

        }
    );
});

module.exports = function (app) {
    app.use("/ec/", router);
};