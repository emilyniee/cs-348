"use client"; 

import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/leaderboards")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  var parsedData = [];
  if (data != null) {
    JSON.stringify(data)
    parsedData = data.map(([id, name, ptsScored]) => ({
      id,
      name,
      ptsScored
    }));
  }

  if (!data || !parsedData) return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>Loading leaderboard...</div>
  )

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <h1 className="font-semibold text-xl rounded-lg text-gray-800"> Leaderboard 🏆</h1>
      <div className='bg-blue-100'>
        <div className="space-y-3 max-h-72 overflow-y-auto p-6">
          {parsedData.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md"
            >
              <span className="font-semibold text-lg text-gray-800">{player.name}</span>
              <span className="text-red-400 font-bold">{player.ptsScored} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
