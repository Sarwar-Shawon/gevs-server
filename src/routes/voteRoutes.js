/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const voteController = require("../controllers/voteController");
const voteRouter = express.Router();
const { auth } = require("../middleware/auth");
const { voteValidator } = require("../utils/validator");

//
voteRouter.route("/provide").post(voteValidator, auth, voteController.addVote);
voteRouter.route("/get").get(voteValidator, auth, voteController.getVote);
module.exports = voteRouter;
