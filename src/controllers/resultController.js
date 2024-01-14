/*
 * @copyRight by md sarwar hoshen.
 */
const Candidate = require("../models/candidate");
const ElectionSettings = require("../models/electionSettings");
const { ObjectId } = require("mongodb");
// add new Constituency
const getVoteResult = async (req, res) => {
  try {
    // Get all candidates
    const candidates = await Candidate.find();
    // calculate winner candidates from constituency
    let winnerCandidatesByConstituency = {};
    candidates.forEach((item) => {
      const { constituency_name, candidate, party_name, vote_count } = item;
      if (!winnerCandidatesByConstituency[constituency_name]) {
        winnerCandidatesByConstituency[constituency_name] = {
          name: candidate,
          party: party_name,
          vote: vote_count,
        };
      } else {
        if (
          vote_count > winnerCandidatesByConstituency[constituency_name].vote
        ) {
          winnerCandidatesByConstituency[constituency_name] = {
            name: candidate,
            party: party_name,
            vote: vote_count,
          };
        }
      }
    });
    // calculate party seats
    const partySeats = {};
    Object.values(winnerCandidatesByConstituency).forEach((winner) => {
      const { party } = winner;
      partySeats[party] = (partySeats[party] || 0) + 1;
    });
    //calculate total seats
    const totalSeats = Object.values(partySeats).reduce(
      (total, seats) => total + seats,
      0
    );
    const maxSeats = Math.max(...Object.values(partySeats));
    let hung_parliament = false;
    if (maxSeats / totalSeats <= 0.5) hung_parliament = true;
    //calculate winning party
    const winningParty = Object.keys(partySeats).reduce((a, b) =>
      partySeats[a] > partySeats[b] ? a : b
    );
    //
    const electionSettings = await ElectionSettings.findOne({
      settingsId: "Shangri-La-Election",
    });
    const isElectionOngoing =
      electionSettings.status == "ongoing" ||
      electionSettings.status == "not-started"
        ? true
        : false;
    const winnerStatus = isElectionOngoing
      ? "Pending"
      : hung_parliament
      ? "Hung Parliament"
      : winningParty;
    // console.log("winnerStatus::::", winnerStatus);
    const result = {
      status: isElectionOngoing ? "Pending" : "Completed",
      winner: winnerStatus,
      seats: Object.entries(partySeats).map(([party, seat]) => ({
        party,
        seat: seat.toString(),
      })),
    };
    // console.log("result", result);
    res.send({ status: "success", data: result });
  } catch (err) {
    console.error("Error calculating election result:", err);
    res.send({ status: "err", message: err?.message });
  }
};
module.exports = {
  getVoteResult,
};
