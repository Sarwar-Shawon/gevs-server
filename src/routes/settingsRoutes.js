/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const settingsController = require("../controllers/electionSettingsController");
const uvcCodeRouter = express.Router();
//
uvcCodeRouter.route("/get-status").get(settingsController.getElectionStatus);
uvcCodeRouter
  .route("/update-status")
  .post(settingsController.updateElectionStatus);
module.exports = uvcCodeRouter;
