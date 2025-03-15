"use client"; 
import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [teamName, setTeamName] = useState("");

  const fetchMatchups = () => {
    if (!teamName) return;

    fetch(`http://localhost:8000/team_best_worst_matchup?teamName=${teamName.toUpperCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  var parsedData = [];
  var worstMatchups = [];
  var bestMatchups = [];
  if (data != null) {
    JSON.stringify(data)
    parsedData = data.map(([opName, ptsScored]) => ({
      opName,
      ptsScored
    }));

    parsedData = parsedData.sort((a, b) => a.ptsScored - b.ptsScored);

    for (let i = 0; i < 3; i++) {
      worstMatchups.push(parsedData[i])
    }
    for (let i = 3; i < 6; i++) {
      bestMatchups.push(parsedData[i])
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-black'>
      <h1 className="font-semibold text-xltext-gray-800"> Matchups of the Season </h1>
      <div className='m-4'>
        <input
          type="text"
          className='mr-4 p-1 rounded-md'
          placeholder="enter team name"
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value)
          }}
        />
        <button className="bg-blue-500 px-2 py-1 rounded-lg text-white" onClick={fetchMatchups}>Go</button>
      </div>
      
      {(parsedData.length != 0) && (
        <div className='bg-blue-100 rounded-lg '>
          <div className="space-y-3 max-h-72 overflow-y-auto p-6">
            <h1 className="font-semibold text-lg text-gray-800"> Best</h1>
            {bestMatchups.map((team, idx) => (
              <div
                key={team.opName + idx}
                className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md"
              >
                <div className="font-semibold text-lg text-gray-800 mr-4">{team.opName}</div>
                <div className="text-red-400 font-bold">{team.ptsScored.toFixed(2)} pts</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 max-h-72 overflow-y-auto p-6">
          <h1 className="font-semibold text-lg text-gray-800"> Worst</h1>
            {worstMatchups.map((team, idx) => (
              <div
                key={team.opName + idx}
                className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md"
              >
                <div className="font-semibold text-lg text-gray-800 mr-4">{team.opName}</div>
                <div className="text-red-400 font-bold">{team.ptsScored.toFixed(2)} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
