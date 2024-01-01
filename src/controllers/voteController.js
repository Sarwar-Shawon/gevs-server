/*
 * @copyRight by md sarwar hoshen.
 */
const Vote = require("../models/vote");
// add new Vote
const addVote = async (req, res) => {
  try {
    console.log("req.body::", req.body);
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
//
//
module.exports = {
  addVote,
};
