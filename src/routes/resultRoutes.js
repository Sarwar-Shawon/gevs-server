/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const resultController = require("../controllers/resultController");
const resultRouter = express.Router();
const { auth } = require("../middleware/auth");

//
resultRouter.route("/").get(auth, resultController.getVoteResult);
resultRouter.route("/withouttoken").get(resultController.getVoteResult);
module.exports = resultRouter;
