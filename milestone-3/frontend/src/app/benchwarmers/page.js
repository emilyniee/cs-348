"use client"; 

import { useState, useEffect } from 'react';

export default function Benchwarmers() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [thresholdMinute, setThresholdMinute] = useState("15");

  // Re-fetch data whenever the thresholdMinute changes
  useEffect(() => {
    if(thresholdMinute.trim() === "")
      return;
    fetch(`http://localhost:8000/best_benchwarmers?threshold_minute=${thresholdMinute}`)
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((error) => console.error("Error fetching data:", error));
    
  }, [thresholdMinute]);
  
  let parsedData = [];
  if (data != null) {
    parsedData = data.map(
      ([
        id,
        name,
        avgMinutes,
        pointsPer36,
        assistsPer36,
        reboundsPer36,
        blocksPer36,
        stealsPer36,
        turnoversPer36,
        fgAttemptsPer36,
        threePtAttemptsPer36,
      ]) => ({
        id,
        name,
        avgMinutes,
        pointsPer36,
        assistsPer36,
        reboundsPer36,
        blocksPer36,
        stealsPer36,
        turnoversPer36,
        fgAttemptsPer36,
        threePtAttemptsPer36,
      })
    );
  }

  // Filter the parsedData based on the player name (case-insensitive)
  const filteredData = parsedData.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!data || !parsedData) return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>
      Loading benchwarmers...
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <h1 className="font-semibold text-xl text-gray-800 m-2">
        Best Benchwarmers: Per 36 Minutes 🪑
      </h1>
      {/* Search Bars aligned horizontally */}
      <div className="mb-4 flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />
        <input
          type="number"
          placeholder="Enter threshold minute..."
          value={thresholdMinute}
          onChange={(e) => setThresholdMinute(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />
      </div>
      <div className="bg-blue-100 rounded-lg">
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
          {/* Header using grid layout */}
          <div className="grid grid-cols-11 gap-4 font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
            <div className="col-span-2">Name</div>
            <div>Avg Minutes</div>
            <div>Points</div>
            <div>Assists</div>
            <div>Rebounds</div>
            <div>Blocks</div>
            <div>Steals</div>
            <div>Turnovers</div>
            <div>FG Attempts</div>
            <div>3PT Attempts</div>
          </div>
          {/* Data rows using grid layout */}
          <div className="space-y-3">
            {filteredData.map((player) => (
              <div
                key={player.id}
                className="grid grid-cols-11 gap-4 bg-white p-4 shadow-md rounded-lg"
              >
                <div className="col-span-2 font-semibold text-lg text-gray-800">
                  {player.name}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.avgMinutes).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.pointsPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.assistsPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.reboundsPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.blocksPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.stealsPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.turnoversPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.fgAttemptsPer36).toFixed(2)}
                </div>
                <div className="text-red-400 font-bold">
                  {Number(player.threePtAttemptsPer36).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
