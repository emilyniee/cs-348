"use client"; 
import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/team_best_worst_matchup")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  var parsedData = [];
  var worstMatchups = [];
  var bestMatchups = [];
  if (data != null) {
    JSON.stringify(data)
    parsedData = data.map(([opName, id, ptsScored]) => ({
      opName,
      id,
      ptsScored
    }));

    for (var pd of parsedData) {
      if (pd.ptsScored < 0) {
        worstMatchups.push(pd)
      } else {
        bestMatchups.push(pd)
      }
    }
  }

  if (!data || !parsedData) return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>Loading leaderboard...</div>
  )

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <h1 className="font-semibold text-xl rounded-lg text-gray-800"> Matchups of the Season </h1>
      <div className='bg-blue-100'>
        <div className="space-y-3 max-h-72 overflow-y-auto p-6">
          <h1 className="font-semibold text-lg rounded-lg text-gray-800"> Best</h1>
          {bestMatchups.map((team) => (
            <div
              key={team.id}
              className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md"
            >
              <span className="font-semibold text-lg text-gray-800">{team.opName}</span>
              <span className="text-red-400 font-bold">{team.ptsScored} pts</span>
            </div>
          ))}
        </div>
        
        <div className="space-y-3 max-h-72 overflow-y-auto p-6">
        <h1 className="font-semibold text-lg rounded-lg text-gray-800"> Worst</h1>
          {worstMatchups.map((team) => (
            <div
              key={team.id}
              className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md"
            >
              <span className="font-semibold text-lg text-gray-800">{team.opName}</span>
              <span className="text-red-400 font-bold">{team.ptsScored} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
