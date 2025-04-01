"use client"; 

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/position_comparison")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          console.log(data)
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  var parsedData = [];
  if (data != null) {
    JSON.stringify(data)
    parsedData = data.map(([positionName, pts, as, rbs, blks, stls, trnvs, threeperc, fgperc, ftperc, avgmin]) => ({
      positionName,
      pts, 
      as, 
      rbs, 
      blks, 
      stls, 
      trnvs,
      threeperc, 
      fgperc, 
      ftperc, 
      avgmin
    }));
  }

  if (!data.length) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>
        Loading Position Comparison
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <h1 className="font-semibold text-xl text-gray-800 m-2"> Position Comparison 🧍‍♂️</h1>
      <div className="bg-blue-100 rounded-lg">
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
          <div className="grid grid-cols-11 gap-4 font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
            <div>Name</div>
            <div>Avg Pts</div>
            <div>Avg Assists</div>
            <div>Avg Rebounds</div>
            <div>Avg Blocks</div>
            <div>Avg Steals</div>
            <div>Avg Turnovers</div>
            <div>Avg Three Point Percentage</div>
            <div>Avg Field Goal Percentage</div>
            <div>Avg Free Throw Percentage</div>
            <div>Avg Minutes Played</div>
          </div>
          <div className="space-y-3">
            {parsedData.map((position) => (
              <div key={position.positionName} className="grid grid-cols-11 gap-4 bg-white p-4 shadow-md rounded-lg">
                {Object.entries(position).map(([key, value]) => (
                <div key={key} className="font-semibold text-lg text-gray-800 mr-4">
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </div>
              ))}  
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
