/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const candidateController = require("../controllers/candidateController");
const candidateRouter = express.Router();
//admin add candidates
candidateRouter.route("/add").post(candidateController.addCandidate);
//voter provides vote
candidateRouter
  .route("/provide-vote")
  .post(candidateController.addVoteToCandidate);
//
module.exports = candidateRouter;
