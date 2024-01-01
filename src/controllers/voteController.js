/*
 * @copyRight by md sarwar hoshen.
 */
const Vote = require("../models/vote");
// add new Vote
const addVote = async (req, res) => {
  try {
    // console.log("req.body::", req.body);
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
    console.log("req.query::", req.query.voter_id);
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
