"use strict";
/**
 *@author Tilak
 *@since May 18, 2020
*/

var CronJob = require('cron').CronJob;
const axios = require('axios');

var job = new CronJob('* * * * *', function () {

  axios.get('http://localhost:4002/ec/runCampaign');

}, null, true);
job.start();