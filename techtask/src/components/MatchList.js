import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MatchList = () => {
  const [matchesListData, setMatchesListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
        headers: {
          "X-RapidAPI-Key": "c54b7e885amsh1c216b03990c7dbp1c331fjsn35e68b086b1d",
        },
      })
      .then((response) => {
        console.log(response.data)
        setMatchesListData(response.data.typeMatches || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cricket Matches</h1>
      {matchesListData.map((matchType, index) => (
        <div key={index}>
          <h2 className="text-primary">Match Type:{matchType.matchType}</h2>
          {matchType.seriesMatches.map((series, seriesIndex) => (
            <div key={seriesIndex}>
              {series.seriesAdWrapper?.matches.map((match, matchIndex) => (
                <div key={matchIndex} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{match?.seriesName}</h5>
                    <p className="card-text">
                      <strong>Team 1: </strong>{match.matchInfo.team1?.teamSName} - {match.matchScore?.team1Score?.inngs1?.runs}/{match.matchScore?.team1Score?.inngs1?.wickets} ({match.matchScore?.team1Score?.inngs1?.overs})
                    </p>
                    <p className="card-text">
                      <strong>Team 2: </strong>{match.matchInfo.team2?.teamSName} - {match.matchScore?.team2Score?.inngs1?.runs}/{match.matchScore?.team2Score?.inngs1?.wickets} ({match.matchScore?.team2Score?.inngs1?.overs})
                    </p>
                    <p className="card-text"><strong>Match Result:</strong> {match.matchInfo.status}</p>
                    <Link to={`/match/${match.matchInfo.matchId}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchList;
