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
    console.log(
      "winnerCandidatesByConstituency",
      winnerCandidatesByConstituency
    );
    // calculate party seats
    const partySeats = {};
    Object.values(winnerCandidatesByConstituency).forEach((winner) => {
      const { party } = winner;
      partySeats[party] = (partySeats[party] || 0) + 1;
    });
    console.log("partySeats", partySeats);
    //calculate winning party
    const winningParty = Object.keys(partySeats).reduce((a, b) =>
      partySeats[a] > partySeats[b] ? a : b
    );
    console.log("winningParty", winningParty);
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
      : Object.values(partySeats).some((seatCount) => {
          console.log("seatCount:::", seatCount);
          seatCount >= candidates.length / 2;
        })
      ? winningParty
      : "Hung Parliament";
    console.log("winnerStatus::::", winnerStatus);
    const result = {
      status: isElectionOngoing ? "Pending" : "Completed",
      winner: winnerStatus,
      seats: Object.entries(partySeats).map(([party, seat]) => ({
        party,
        seat: seat.toString(),
      })),
    };
    console.log("output", result);
    res.send({ status: "success", data: result });
    // Calculate seats and vote count for each candidate in each constituency
    // const seatsByConstituency = {};
    // Object.entries(candidatesByConstituency).forEach(
    //   ([constituencyId, constituencyCandidates]) => {
    //     const seats = constituencyCandidates.reduce(
    //       (acc, candidate) => {
    //         // Calculate vote count for each candidate in the constituency
    //         if (!acc.voteCountByCandidate[candidate._id.toString()]) {
    //           acc.voteCountByCandidate[candidate._id.toString()] = 0;
    //         }
    //         const voteCount = candidate.vote_count || 0;
    //         acc.voteCountByCandidate[candidate._id.toString()] += voteCount;

    //         // Calculate seats for each party in the constituency
    //         acc.partySeats[candidate.party_name] =
    //           (acc.partySeats[candidate.party_name] || 0) + 1;

    //         return acc;
    //       },
    //       { partySeats: {}, voteCountByCandidate: {} }
    //     );
    //     seatsByConstituency[constituencyId] = seats;
    //   }
    // );
    // console.log("seatsByConstituency", seatsByConstituency);

    // // Calculate overall seats and vote count for each candidate
    // const overallSeats = {};
    // const overallVoteCountByCandidate = {};
    // Object.entries(seatsByConstituency).forEach(
    //   ([constituencyId, constituencySeats]) => {
    //     Object.entries(constituencySeats.voteCountByCandidate).forEach(
    //       ([candidateId, voteCount]) => {
    //         if (!overallSeats[candidateId]) {
    //           overallSeats[candidateId] = 0;
    //         }
    //         overallSeats[candidateId] += voteCount;

    //         if (!overallVoteCountByCandidate[candidateId]) {
    //           overallVoteCountByCandidate[candidateId] = 0;
    //         }
    //         overallVoteCountByCandidate[candidateId] += voteCount;
    //       }
    //     );
    //   }
    // );
    // console.log("overallSeats::::", overallSeats);
    // console.log("overallVoteCountByCandidate::::", overallVoteCountByCandidate);
    // // Determine the overall winner and if there is a majority
    // const overallWinner = Object.keys(overallSeats).reduce((a, b) =>
    //   overallSeats[a] > overallSeats[b] ? a : b
    // );
    // const totalSeats = Object.values(overallSeats).reduce(
    //   (acc, seat) => acc + seat,
    //   0
    // );
    // const majorityThreshold = totalSeats / 2;
    // const isMajority = overallSeats[overallWinner] > majorityThreshold;

    // // Construct the result object in the specified format
    // const result = {
    //   status: isMajority ? "Completed" : "Hung Parliament",
    //   winner: isMajority ? overallWinner : "No Majority",
    //   seats: Object.entries(overallSeats).map(([candidateId, seat]) => ({
    //     party: candidates.find((c) => c._id.toString() === candidateId)
    //       .party_name,
    //     seat: seat.toString(),
    //   })),
    // };

    // console.log(result);
    // res.send({ status: "success", result: result });
  } catch (err) {
    console.error("Error calculating election result:", err);
    res.send({ status: "err", message: err?.message });
  }
};
module.exports = {
  getVoteResult,
};
