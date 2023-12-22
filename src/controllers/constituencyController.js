/*
 * @copyRight by md sarwar hoshen.
 */
const Constituency = require("../models/constituency");
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
//
module.exports = {
  addConstituency,
};
