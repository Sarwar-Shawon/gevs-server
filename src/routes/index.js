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

module.exports = router;
