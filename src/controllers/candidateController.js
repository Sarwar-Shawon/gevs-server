/*
 * @copyRight by md sarwar hoshen.
 */
const Candidate = require("../models/candidate");
// add new Candidate code
const addCandidate = async (req, res) => {
  try {
    console.log("req.body::", req.body);
    const candidate = new Candidate({
      //   canid: {
      //     type: Number,
      //     unique: true,
      //     required: true,
      //   },
      candidate: req.body.candidate,
      party_id: req.body.party_id,
      consitituency_id: req.body.consitituency_id,
      vote_count: 0,
    });
    //save to db
    await candidate.save();
    //return response
    return res.status(200).json({
      status: "success",
      message: "You've successfully added a new Candidate.",
    });
  } catch (err) {
    //return err
    console.error("err", err);
    res.send({ status: "err", message: err });
  }
};
//
module.exports = {
  addCandidate,
};
