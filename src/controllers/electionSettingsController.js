/*
 * @copyRight by md sarwar hoshen.
 */
const ElectionSettings = require("../models/electionSettings");
// get election status
const getElectionStatus = async (req, res) => {
  try {
    console.log("req.query", req.query);
    const electionSettings = await ElectionSettings.findOne({
      settingsId: req.query.settingsId,
    });
    console.log("electionSettings:::", electionSettings);
    if (electionSettings) {
      return res.send({
        status: "success",
        data: electionSettings.status,
      });
    }
    return res.send({
      status: "not found",
      message: "settings not found",
    });
  } catch (err) {
    //return err
    res.send({ status: "err", message: err });
  }
};
//
// update election status
const updateElectionStatus = async (req, res) => {
  try {
    const electionSettings = await ElectionSettings.findOne({
      settingsId: req.body.settingsId,
    });
    console.log("electionSettings:::", electionSettings);
    if (electionSettings) {
      electionSettings.status = req.body.status;
      await electionSettings.save();
    }
    return res.send({
      status: "not found",
      message: "settings not found",
    });
  } catch (err) {
    //return err
    res.send({ status: "err", message: err });
  }
};
//
module.exports = {
  getElectionStatus,
  updateElectionStatus,
};
