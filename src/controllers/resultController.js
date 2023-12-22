/*
 * @copyRight by md sarwar hoshen.
 */
const Constituency = require("../models/constituency");
const Candidate = require("../models/candidate");
// add new Constituency
const getVoteResult = async (req, res) => {
  try {
    // Get all candidates
    const candidates = await Candidate.find();
    // Group candidates by constituency
    const candidatesByConstituency = candidates.reduce((acc, candidate) => {
      if (!acc[candidate.constituency_id]) {
        acc[candidate.constituency_id] = [];
      }
      acc[candidate.constituency_id].push(candidate);
      return acc;
    }, {});
    console.log("candidatesByConstituency", candidatesByConstituency);
    // Calculate seats for each party in each constituency
    const seatsByConstituency = {};
    for (const [constituencyId, constituencyCandidates] of Object.entries(
      candidatesByConstituency
    )) {
      const seats = constituencyCandidates.reduce((acc, candidate) => {
        if (!acc[candidate.party_name]) {
          acc[candidate.party_name] = 0;
        }
        acc[candidate.party_name]++;
        return acc;
      }, {});
      seatsByConstituency[constituencyId] = seats;
    }

    // Calculate overall seats
    const overallSeats = Object.entries(seatsByConstituency).reduce(
      (acc, [constituencyId, seats]) => {
        const winnerParty = Object.keys(seats).reduce((a, b) =>
          seats[a] > seats[b] ? a : b
        );
        if (!acc[winnerParty]) {
          acc[winnerParty] = 0;
        }
        acc[winnerParty]++;
        return acc;
      },
      {}
    );

    // Find the overall winner
    const overallWinner = Object.keys(overallSeats).reduce((a, b) =>
      overallSeats[a] > overallSeats[b] ? a : b
    );

    // Construct the result object
    const result = {
      status: "Completed",
      winner: overallWinner,
      seats: Object.entries(overallSeats).map(([party, seat]) => ({
        party,
        seat: seat.toString(),
      })),
    };
    console.log(result);
    res.status(200).json({ status: "success", result: result });
  } catch (err) {
    console.error("Error calculating election result:", err);
    res.status(404).json({ status: "err", result: err?.message });
  }
};
module.exports = {
  getVoteResult,
};
