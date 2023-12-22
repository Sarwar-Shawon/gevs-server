/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const candidateController = require("../controllers/candidateController");
const candidateRouter = express.Router();
//
candidateRouter.route("/add").post(candidateController.addCandidate);
module.exports = candidateRouter;
