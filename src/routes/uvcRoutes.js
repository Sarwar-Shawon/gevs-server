/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const uvcController = require("../controllers/uvcController");
const uvcCodeRouter = express.Router();
//
uvcCodeRouter.route("/add").post(uvcController.addUvc);
module.exports = uvcCodeRouter;
