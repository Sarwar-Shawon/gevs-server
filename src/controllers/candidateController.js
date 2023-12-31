/*
 * @copyRight by md sarwar hoshen.
 */
const Candidate = require("../models/candidate");
const Voter = require("../models/voter");
const { ObjectId } = require("mongodb");
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
      party_name: req.body.party_name,
      constituency_id: req.body.constituency_id,
      constituency_name: req.body.constituency_name,
      vote_count: req.body.vote_count || 0,
    });
    //save to db
    await candidate.save();
    //return response
    return res.send({
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
const addVoteToCandidate = async (req, res) => {
  try {
    //check voter has already provided vote or not
    const voter = await Voter.findOne({ voter_id: req.body.voter_id });
    if (voter) {
      if (!voter.provide_vote) {
        const candidate = await Candidate.findOne({
          _id: new ObjectId(req.body.candidate_id),
        });
        if (candidate) {
          candidate.vote_count += 1;
          await candidate.save();
          return res.send({
            status: "success",
            message: "You've successfully provided your vote..",
          });
        } else {
          return res.send({
            status: "err",
            message: "No candidates found.",
          });
        }
      } else {
        return res.send({
          status: "err",
          message:
            "You've already provided your vote so you can't provide any more.",
        });
      }
    }
  } catch (err) {
    //return err
    console.error("err", err);
    res.send({ status: "err", message: err });
  }
};
//
const getCandidatesByConstituencyId = async (req, res) => {
  try {
    const voter = await Voter.findOne({ voter_id: req.params.voter_id });
    if (voter) {
      const candidates = await Candidate.find({
        constituency_id: new ObjectId(voter.constituency_id),
      });
      return res.send({
        status: "success",
        data: candidates,
      });
    }
  } catch (err) {
    //return err
    // console.error("err", err);
    res.send({ status: "err", message: err.message });
  }
};
//

//
module.exports = {
  addCandidate,
  addVoteToCandidate,
  getCandidatesByConstituencyId,
};
