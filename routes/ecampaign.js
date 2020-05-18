"use strict";
/**
 *@author Tilak
 *@since May 17, 2020
 */

let express = require("express")
    , router = express.Router()
    , helpers = require("../lib/utils")
    , Joi = require("@hapi/joi")
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

        helpers.resSuccess(res, {
            campaignId: "8767675645365sdas232",
            message: "Your campaign is in proress.",
            data: {
                "senderName": "Sam",
                "senderEmail": "sam@sam.com",
                "emailTo": [
                    "sam1@sam.com",
                    "sam1@sam.com"
                ],
                "emailSubject": "Welcome email.",
                "emailBody": "Hello, we are glad to have you in our team.",
                "emailSchedule": [
                    {
                        "date": "05/30/2021",
                        "time": "19:00"
                    }
                ]
            }
        });

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

        helpers.resSuccess(res, {
            campaignId: "8767675645365sdas232",
            message: "Please note you campaign id for further queries.",
            data: postData
        });

    } catch (e) {
        helpers.resError(res, e, true, null);
    }

});

module.exports = function (app) {
    app.use("/ec/", router);
};