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
      <h1 className="font-semibold text-xl text-gray-800 m-2"> Leaderboard 🏆</h1>
      <div className="bg-blue-100 rounded-lg">
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
        <div className="flex items-center justify-between font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
            <div className="mr-4">Name</div>
            <div>Avg Pts</div>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {parsedData.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
            >
              <div className="font-semibold text-lg text-gray-800 mr-4">{player.name}</div>
              <div className="text-red-400 font-bold">{player.ptsScored.toFixed(2)} </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
