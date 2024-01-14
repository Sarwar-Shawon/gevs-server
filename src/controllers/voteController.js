/*
 * @copyRight by md sarwar hoshen.
 */
const Vote = require("../models/vote");
const { validationResult } = require("express-validator");
// add new Vote
const addVote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = "";
      errors.array().map((item, index) => {
        err_msg += item.msg;
        if (index != errors.array().length - 1) err_msg += "\n";
      });
      return res.send({ status: "error", message: err_msg });
    }
    const vote = new Vote({
      voter_id: req.body.voter_id,
      uvc: req.body.uvc,
      candidate_id: req.body.candidate_id,
    });
    //save to db
    await vote.save();
    //return response
    return res.send({
      status: "success",
      message: "You've successfully given your vote.",
    });
  } catch (err) {
    //return err
    if (err.code == "11000") {
      res.send({ status: "exists", message: "Already provided vote." });
    } else {
      res.send({ status: "err", message: err });
    }
  }
};
// get vote
const getVote = async (req, res) => {
  try {
    if (!req.query.voter_id) {
      return res.send({ status: "error", message: "voter id required." });
    }
    const vote = await Vote.findOne({
      voter_id: req.query.voter_id,
    });
    //return response
    if (vote) {
      return res.send({
        status: "success",
        data: vote,
      });
    } else {
      return res.send({
        status: "success",
        data: null,
      });
    }
  } catch (err) {
    res.send({ status: "err", message: err.message });
  }
};
//
module.exports = {
  addVote,
  getVote,
};
