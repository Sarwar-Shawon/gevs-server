/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const voteController = require("../controllers/voteController");
const voteRouter = express.Router();
const { auth } = require("../middleware/auth");

//
voteRouter.route("/provide").post(auth, voteController.addVote);
voteRouter.route("/get").get(auth, voteController.getVote);
module.exports = voteRouter;
