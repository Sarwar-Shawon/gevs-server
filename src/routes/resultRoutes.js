/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const resultController = require("../controllers/resultController");
const resultRouter = express.Router();
//
resultRouter.route("/").get(resultController.getVoteResult);
module.exports = resultRouter;
