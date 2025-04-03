"use client"; 

import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [stat, setStat] = useState("");
  const [statHeader, setStatHeader] = useState("");

  const stats = {
    "pts": "Points",
    "assists": "Assists",
    "rebounds": "Rebounds",
    "steals": "Steals",
    "blocks": "Blocks",
    "fg": "Field Goal Percentage",
    "3pt": "Three Point Percentage"
};  

  const fetchLeaderBoards = () => {
    fetch(`http://localhost:8000/leaderboards?stat=${stat}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setStatHeader(stat)
        console.log('fetched')
    })
      .catch((error) => console.error("Error fetching data:", error));
  };
  
  var parsedData = [];
  if (data != null) {
    JSON.stringify(data)
    console.log(data)
    parsedData = data.map(([id, name, stat]) => ({
      id,
      name,
      stat
    }));
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <h1 className="font-semibold text-xl text-gray-800 m-2"> Leaderboard 🏆</h1>

      <div className='m-4 text-gray-800'>
          <select
            id="arena-select"
            value={stat}
            onChange={(e) => setStat(e.target.value)}
            className="p-1 mr-4 rounded-lg border"
          >
            <option value="" disabled>Select a statistic</option>
            {Object.entries(stats).map(([shortName, fullName]) => (
              <option key={shortName} value={shortName}>
                {fullName}
              </option>
            ))}
          </select>
        <button className="bg-blue-500 px-2 py-1 rounded-lg text-white" onClick={fetchLeaderBoards}>Go</button>
      </div>

      <div className="bg-blue-100 rounded-lg">
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
        <div className="flex items-center justify-between font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
            <div className="mr-4">Name</div>
            <div>{stats[statHeader] || "Statistic" }</div>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {parsedData.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
            >
              <div className="font-semibold text-lg text-gray-800 mr-4">{player.name}</div>
              <div className="text-red-400 font-bold">
                {["fg", "3pt"].includes(statHeader) 
                  ? `${(player.stat * 100).toFixed(2)}%`  
                  : player.stat.toFixed(2)                
                }
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
