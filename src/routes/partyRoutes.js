/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const partyController = require("../controllers/partyController");
const partyRouter = express.Router();
//
partyRouter.route("/add").post(partyController.addParty);
partyRouter.route("/all").get(partyController.getAllParty);
module.exports = partyRouter;
