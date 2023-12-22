/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const constituencyController = require("../controllers/constituencyController");
const constituencyRouter = express.Router();
//
constituencyRouter.route("/add").post(constituencyController.addConstituency);
constituencyRouter
  .route("/:constituency_name")
  .get(constituencyController.getAllCandidatesByConstituency);

module.exports = constituencyRouter;
