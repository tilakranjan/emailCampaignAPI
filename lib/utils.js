"use strict";
/**
 *@description main server file
 *@author Tilak
 *@since Feb 27, 2020
 */

module.exports = {
  resError: (res, e, writeToLog, input) => {
    res.json({ success: false, error: e.message || e });
    if (writeToLog) {
      console.log(e.message);
    }
  },

  resSuccess: (res, data) => {
    res.json({ success: true, result: data });
  },

  logInfo: (msg) => {
    console.log(msg);
  },

  logWarn: (msg) => {
    console.warn(msg);
  },

  logError: (msg) => {
    console.error(msg);
  }
};
