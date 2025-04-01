"use client"; 
import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/most_triple_doubles")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  var parsedData = [];
  if (data != null) {
    JSON.stringify(data)
    console.log(data)
    parsedData = data.map(([player_id, player_name, team_name, td]) => ({
      player_id,
      player_name,
      team_name,
      td
    }));
    console.log(parsedData)
  }

  if (!data || !parsedData) return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>Loading ...</div>
  )

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200'>
    <h1 className="font-semibold text-xl text-gray-800 m-2"> Most Triple Doubles 🔟 🔟 🔟</h1>
    <div className="bg-blue-100 rounded-lg">
      <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
      <div className="grid grid-cols-3 gap-4 font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
          <div className="mr-4">Name</div>
          <div className="mr-4">Team</div>
          <div># Triple Doubles</div>
        </div>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {parsedData.map((player) => (
          <div
            key={player.player_id}
            className="grid grid-cols-3 gap-4 bg-white p-4 shadow-md rounded-lg"
          >
            <div className="font-semibold text-lg text-gray-800 mr-4">{player.player_name}</div>
            <div className="font-semibold text-lg text-gray-800 mr-4">{player.team_name} </div>
            <div className="text-red-400 font-bold">{player.td} </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  </div>
  );
}
