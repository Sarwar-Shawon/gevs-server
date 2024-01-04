/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const settingsController = require("../controllers/electionSettingsController");
const uvcCodeRouter = express.Router();
const { auth } = require("../middleware/auth");
//
uvcCodeRouter
  .route("/get-status")
  .get(auth, settingsController.getElectionStatus);
uvcCodeRouter
  .route("/update-status")
  .post(auth, settingsController.updateElectionStatus);
module.exports = uvcCodeRouter;
