/*
 * @copyRight by md sarwar hoshen.
 */
const Party = require("../models/party");
// add new Party
const addParty = async (req, res) => {
  try {
    const party = new Party({
      party: req.body.party,
    });
    //save to db
    await party.save();
    //return response
    return res.status(200).json({
      status: "success",
      message: "You've successfully added a new party.",
    });
  } catch (err) {
    //return err
    res.send({ status: "err", message: err });
  }
};
//
module.exports = {
  addParty,
};
