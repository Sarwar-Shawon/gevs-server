/*
 * @copyRight by md sarwar hoshen.
 */
const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);
// uvc routes
const uvcCodeRouter = require("./uvcRoutes");
router.use("/uvc", uvcCodeRouter);
// constituency routes
const constituencyRouter = require("./constituencyRoutes");
router.use("/constituency", constituencyRouter);
// party routes
const partyRouter = require("./partyRoutes");
router.use("/party", partyRouter);
// candidate routes
const candidateRouter = require("./candidateRoutes");
router.use("/candidate", candidateRouter);
// get results
const resultRouter = require("./resultRoutes");
router.use("/results", resultRouter);
// settings routes
const settingstRouter = require("./settingsRoutes");
router.use("/settings", settingstRouter);
// settings routes
const voteRouter = require("./voteRoutes");
router.use("/vote", voteRouter);
//
module.exports = router;
