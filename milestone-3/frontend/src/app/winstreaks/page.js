"use client"; 

import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/longest_win_streaks")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  var parsedData = [];
  if (data != null) {
    JSON.stringify(data)
    parsedData = data.map(([name, season, streakLength]) => ({
      name,
      season,
      streakLength
    }));
  }

  const filteredData = parsedData.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!data || !parsedData) return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>Loading win streaks...</div>
  )

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <h1 className="font-semibold text-xl text-gray-800 m-2"> {parsedData[0].season} Longest Win Streaks 🔥</h1>
      <div className="bg-blue-100 rounded-lg">
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
        <div className="flex items-center justify-between font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
            <div className="mr-4">Team</div>
            <div>Streak Length</div>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredData.map((team) => (
            <div
              key={team.name}
              className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
            >
              <div className="font-semibold text-lg text-gray-800 mr-4">{team.name}</div>
              <div className="text-red-400 font-bold">{team.streakLength} </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2 min-w-[350px]">
        <input
          type="text"
          placeholder="Search by team name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />
      </div>
    </div>
  );
}
