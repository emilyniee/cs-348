"use client";

import { useState } from 'react';

export default function ArenaStats() {
  const [data, setData] = useState(null);
  const [arenaName, setArenaName] = useState("");

  const fetchArenaStats = () => {
    if (!arenaName) return;

    fetch(`http://localhost:8000/arena_stats?arenaName=${arenaName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
      
  };

  let parsedData = [];
  if (data != null) {
    parsedData = data.map(row => ({
      category: row[0],
      team_name: row[1],
      win_percentage: row[2]
    }));
  }
  console.log(data)

  const homeTeamStats = parsedData.filter(item => item.category === "Home Team");
  const topAwayStats = parsedData.filter(item => item.category === "Top Away Team");

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-black'>
      <h1 className="font-semibold text-xl text-gray-800 mb-4">Arena Stats</h1>
      <div className='m-4'>
        <input
          type="text"
          className='mr-4 p-1 rounded-md'
          placeholder="Enter arena name"
          value={arenaName}
          onChange={(e) => setArenaName(e.target.value)}
        />
        <button
          className="bg-blue-500 px-2 py-1 rounded-lg text-white"
          onClick={fetchArenaStats}
        >
          Go
        </button>
      </div>

      {data && (
        <div className='bg-blue-100 rounded-lg p-4 w-full max-w-3xl'>
          {homeTeamStats.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg text-gray-800 mb-2">Home Team Stats</h2>
              {homeTeamStats.map((team, idx) => (
                <div
                  key={`${team.team_name}-${idx}`}
                  className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md mb-2"
                >
                  <div className="font-semibold text-lg text-gray-800">{team.team_name}</div>
                  <div className="text-red-400 font-bold">{Number(team.win_percentage).toFixed(2)}%</div>
                </div>
              ))}
            </div>
          )}

          {topAwayStats.length > 0 && (
            <div>
              <h2 className="font-semibold text-lg text-gray-800 mb-2">Top Away Teams</h2>
              {topAwayStats.map((team, idx) => (
                <div
                  key={`${team.team_name}-${idx}`}
                  className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md mb-2"
                >
                  <div className="font-semibold text-lg text-gray-800">{team.team_name}</div>
                  <div className="text-red-400 font-bold">{Number(team.win_percentage).toFixed(2)}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
