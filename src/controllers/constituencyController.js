/*
 * @copyRight by md sarwar hoshen.
 */
const Constituency = require("../models/constituency");
const Candidate = require("../models/candidate");
// add new Constituency
const addConstituency = async (req, res) => {
  try {
    const constituency = new Constituency({
      constituency_name: req.body.constituency_name,
    });
    //save to db
    await constituency.save();
    //return response
    return res.status(200).json({
      status: "success",
      message: "You've successfully added a new Constituency.",
    });
  } catch (err) {
    //return err
    res.send({ status: "err", message: err });
  }
};
// get all Candidates by constituency
const getAllCandidatesByConstituency = async (req, res) => {
  try {
    console.log("req.body::", req.params);
    const candidates = await Candidate.find({
      constituency_name: req.params.constituency_name,
    });
    console.log(candidates);
    if (candidates.length > 0) {
      return res.status(200).json({
        status: "success",
        candidates: candidates,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "No candidates found for the given constituency name.",
      });
    }
  } catch (err) {
    //return err
    console.error("err", err);
    res.send({ status: "err", message: err });
  }
};
//
module.exports = {
  addConstituency,
  getAllCandidatesByConstituency,
};
