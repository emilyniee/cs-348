"use client"; 
import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [teamName, setTeamName] = useState("");

  const fetchRosterStats = () => {
    if (!teamName) return;

    fetch(`http://localhost:8000/roster_stats?teamName=${teamName.toUpperCase()}`)
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
  if (data != null) {
    JSON.stringify(data)
    parsedData = data.map(([id, name, birthday, position, avgPts]) => ({
      id,
      name,
      birthday,
      position, 
      avgPts
    }));
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-black'>
      <h1 className="font-semibold text-xltext-gray-800"> Team Roster Statistics </h1>
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
        <button className="bg-blue-500 px-2 py-1 rounded-lg text-white" onClick={fetchRosterStats}>Go</button>
      </div>
      
      {(parsedData.length != 0) && (
        <div className='bg-blue-100 rounded-lg '>
          <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
            <div className="grid grid-cols-5 gap-4 font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
              <div className="col-span-2">Name</div>
              <div>Birthday</div>
              <div>Position</div>
              <div>Avg Pts</div>
            </div>
            <div className="space-y-3">
              {parsedData.map((player) => (
                <div
                  key={player.id}
                  className="grid grid-cols-5 gap-4 bg-white p-4 shadow-md rounded-lg"
                >
                  <div className="col-span-2 font-semibold text-lg text-gray-800">
                    {player.name}
                  </div>
                  <div className="text-red-400 font-bold">
                    {player.birthday}
                  </div>
                  <div className="text-red-400 font-bold">
                    {player.position}
                  </div>
                  <div className="text-red-400 font-bold">
                    {Number(player.avgPts).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
