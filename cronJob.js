"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
*/

var mailer = require("./lib/mailer");
var scheduleController = require("./controller/schedules");
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function () {
  console.log('Calling job...');

  let d = new Date();
  console.log(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " -- " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());

  scheduleController.getAgg(
    {
      date: d.getDate(),
      month: d.getMonth()+1,
      year: d.getFullYear(),
      time: d.getHours() + ":" + d.getMinutes()
    },
    mres => {
      console.log(mres);
      if (mres.length > 0) {
        for (let x of mres) {
          // call mailer
          mailer({
            from: x.campaign.senderName + " <"+x.campaign.senderEmail+">",
            to: x.campaign.emailTo,
            sub: x.campaign.emailSubject,
            body: x.campaign.emailBody
          });
        }
      }

    }
  );



}, null, true);
job.start();