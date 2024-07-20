// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Card, Container } from 'react-bootstrap';

// const MatchDetail = () => {
//   const [scoreData, setScoreData] = useState(null);
//   const [error, setError] = useState(null);
//   const { matchId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const options = {
//           method: 'GET',
//           url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
//           headers: {
//             'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
//             'X-RapidAPI-Key': 'c54b7e885amsh1c216b03990c7dbp1c331fjsn35e68b086b1d'
//           }
//         };

//         const response = await axios.request(options);
//         console.log(response)
//         setScoreData(response.data);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [matchId]);

//   if (error) return <p>Error fetching data: {error.message}</p>;
//   if (!scoreData) return <p>Loading...</p>;

//   const { scoreCard, status } = scoreData;
//   const innings = scoreCard[0];
//   const { batTeamDetails, bowlTeamDetails, scoreDetails } = innings || {};
//   const { batTeamName } = batTeamDetails || {};
//   const { bowlTeamName } = bowlTeamDetails || {};
//   const { overs, ballNbr, runs, wickets } = scoreDetails || {};

//   return (
//     <Container>
//       <Card className="my-3">
//         <Card.Body>
//             <h1 className='text-decoration-underline'>MatchDetails</h1>
//           <Card.Title>Match Status: {status}</Card.Title>
//           <Card.Text>
//             <strong>Batting Team:</strong> {batTeamName || 'N/A'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Bowling Team:</strong> {bowlTeamName || 'N/A'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Overs:</strong> {overs || 'N/A'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Balls:</strong> {ballNbr || 'N/A'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Runs:</strong> {runs || 'N/A'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Wickets:</strong> {wickets || 'N/A'}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };
// // 
// export default MatchDetail;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Container, Table } from 'react-bootstrap';

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
        console.log('Response Data:', response.data);
        setScoreData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, [matchId]);

  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!scoreData) return <p>Loading...</p>;

  const { scoreCard, status } = scoreData;
  const innings = scoreCard && scoreCard.length > 0 ? scoreCard[0] : null;
  const { batTeamDetails, bowlTeamDetails, scoreDetails } = innings || {};
  const { batTeamName, batsmenData } = batTeamDetails || {};
  const { bowlTeamName, bowlersData } = bowlTeamDetails || {};
  const { overs, ballNbr, runs, wickets } = scoreDetails || {};

  console.log('Bat Team Details:', batTeamDetails);
  console.log('Batsmen Data:', batsmenData);
  console.log('Bowl Team Details:', bowlTeamDetails);
  console.log('Bowlers Data:', bowlersData);

  return (
    <Container>
      <Card className="my-3">
        <Card.Body>
          <h1 className="text-decoration-underline">Match Details</h1>
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
          
          <h2>Batting Scorecard</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Batsman</th>
                <th>Runs</th>
                <th>Balls</th>
                <th>Fours</th>
                <th>Sixes</th>
                <th>Strike Rate</th>
                <th>Out Description</th>
              </tr>
            </thead>
            <tbody>
              {batsmenData && Object.keys(batsmenData).map((key) => {
                const batsman = batsmenData[key];
                return (
                  <tr key={batsman.batId}>
                    <td>{batsman.batName}</td>
                    <td>{batsman.runs}</td>
                    <td>{batsman.balls}</td>
                    <td>{batsman.fours}</td>
                    <td>{batsman.sixes}</td>
                    <td>{batsman.strikeRate}</td>
                    <td>{batsman.outDesc}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          
          <h2>Bowling Scorecard</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bowler</th>
                <th>Overs</th>
                <th>Maidens</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>Economy</th>
              </tr>
            </thead>
            <tbody>
              {bowlersData && Object.keys(bowlersData).map((key) => {
                const bowler = bowlersData[key];
                return (
                  <tr key={bowler.bowlId}>
                    <td>{bowler.bowlName}</td>
                    <td>{bowler.overs}</td>
                    <td>{bowler.maidens}</td>
                    <td>{bowler.runs}</td>
                    <td>{bowler.wickets}</td>
                    <td>{bowler.economy}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MatchDetail;
