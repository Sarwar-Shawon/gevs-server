/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const voteController = require("../controllers/voteController");
const voteRouter = express.Router();
//
voteRouter.route("/provide").post(voteController.addVote);
module.exports = voteRouter;
