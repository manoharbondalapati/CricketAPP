import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

const MatchDetail = () => {
  const [scoreData, setScoreData] = useState(null);
  const [error, setError] = useState(null);
  const { matchId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
          headers: {
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
            'X-RapidAPI-Key': 'c54b7e885amsh1c216b03990c7dbp1c331fjsn35e68b086b1d'
          }
        };

        const response = await axios.request(options);
        console.log(response)
        setScoreData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [matchId]);

  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!scoreData) return <p>Loading...</p>;

  const { scoreCard, status } = scoreData;
  const innings = scoreCard[0];
  const { batTeamDetails, bowlTeamDetails, scoreDetails } = innings || {};
  const { batTeamName } = batTeamDetails || {};
  const { bowlTeamName } = bowlTeamDetails || {};
  const { overs, ballNbr, runs, wickets } = scoreDetails || {};

  return (
    <Container>
      <Card className="my-3">
        <Card.Body>
            <h1 className='text-decoration-underline'>MatchDetails</h1>
          <Card.Title>Match Status: {status}</Card.Title>
          <Card.Text>
            <strong>Batting Team:</strong> {batTeamName || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Bowling Team:</strong> {bowlTeamName || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Overs:</strong> {overs || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Balls:</strong> {ballNbr || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Runs:</strong> {runs || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Wickets:</strong> {wickets || 'N/A'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MatchDetail;
