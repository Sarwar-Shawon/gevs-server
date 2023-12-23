/*
 * @copyRight by md sarwar hoshen.
 */
const Constituency = require("../models/constituency");
const Candidate = require("../models/candidate");
const { ObjectId } = require("mongodb");
// add new Constituency
const getVoteResult = async (req, res) => {
  try {
    // Get all candidates
    const candidates = await Candidate.find();

    // Group candidates by constituency
    const candidatesByConstituency = candidates.reduce((acc, candidate) => {
      const consId = new ObjectId(candidate.constituency_id).toString();
      if (!acc[consId]) {
        acc[consId] = [];
      }
      acc[consId].push(candidate);
      return acc;
    }, {});

    // Calculate seats and vote count for each candidate in each constituency
    const seatsByConstituency = {};
    Object.entries(candidatesByConstituency).forEach(
      ([constituencyId, constituencyCandidates]) => {
        const seats = constituencyCandidates.reduce(
          (acc, candidate) => {
            // Calculate vote count for each candidate in the constituency
            if (!acc.voteCountByCandidate[candidate._id.toString()]) {
              acc.voteCountByCandidate[candidate._id.toString()] = 0;
            }
            const voteCount = candidate.vote_count || 0;
            acc.voteCountByCandidate[candidate._id.toString()] += voteCount;

            // Calculate seats for each party in the constituency
            acc.partySeats[candidate.party_name] =
              (acc.partySeats[candidate.party_name] || 0) + 1;

            return acc;
          },
          { partySeats: {}, voteCountByCandidate: {} }
        );
        seatsByConstituency[constituencyId] = seats;
      }
    );

    // Calculate overall seats and vote count for each candidate
    const overallSeats = {};
    const overallVoteCountByCandidate = {};
    Object.entries(seatsByConstituency).forEach(
      ([constituencyId, constituencySeats]) => {
        Object.entries(constituencySeats.voteCountByCandidate).forEach(
          ([candidateId, voteCount]) => {
            if (!overallSeats[candidateId]) {
              overallSeats[candidateId] = 0;
            }
            overallSeats[candidateId] += voteCount;

            if (!overallVoteCountByCandidate[candidateId]) {
              overallVoteCountByCandidate[candidateId] = 0;
            }
            overallVoteCountByCandidate[candidateId] += voteCount;
          }
        );
      }
    );

    // Determine the overall winner and if there is a majority
    const overallWinner = Object.keys(overallSeats).reduce((a, b) =>
      overallSeats[a] > overallSeats[b] ? a : b
    );
    const totalSeats = Object.values(overallSeats).reduce(
      (acc, seat) => acc + seat,
      0
    );
    const majorityThreshold = totalSeats / 2;
    const isMajority = overallSeats[overallWinner] > majorityThreshold;

    // Construct the result object in the specified format
    const result = {
      status: isMajority ? "Completed" : "Hung Parliament",
      winner: isMajority ? overallWinner : "No Majority",
      seats: Object.entries(overallSeats).map(([candidateId, seat]) => ({
        party: candidates.find((c) => c._id.toString() === candidateId)
          .party_name,
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
