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
//get candidate by ConstituencyId
candidateRouter
  .route("/get-candidates/:voter_id")
  .get(candidateController.getCandidatesByConstituencyId);
//
module.exports = candidateRouter;
