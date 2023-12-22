/*
 * @copyRight by md sarwar hoshen.
 */
const Uvc = require("../models/uvc");
// add new uvc code
const addUvc = async (req, res) => {
  try {
    console.log("req.body::", req.body);
    const uvc = new Uvc({
      UVC: req.body.UVC,
      used: req.body.used,
    });
    //save to db
    await uvc.save();
    //return response
    return res.status(200).json({
      status: "success",
      message: "You've successfully added a new uvc.",
    });
  } catch (err) {
    //return err
    if (err.code == "11000") {
      res.send({ status: "exists", message: "UVC Already Exists." });
    } else {
      res.send({ status: "err", message: err });
    }
  }
};
//
// add new uvc code
const getUvc = async (req, res) => {
  try {
    const uvc = await Uvc.findOne({ UVC: req.query.UVC });
    console.log("uvc:::", uvc);
    if (uvc) {
      return res.status(200).json({
        status: "success",
        data: uvc,
      });
    }
    return res.status(200).json({
      status: "not found",
      message: "uvc not found",
    });
  } catch (err) {
    //return err
    res.send({ status: "err", message: err });
  }
};
//
module.exports = {
  addUvc,
  getUvc,
};
