/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const constituencyController = require("../controllers/constituencyController");
const constituencyRouter = express.Router();
//
constituencyRouter.route("/add").post(constituencyController.addConstituency);
module.exports = constituencyRouter;