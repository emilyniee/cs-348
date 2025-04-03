"use client"; 
import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamNamesDropdown, setTeamNamesDropdown] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/team_names")
    .then((res) => res.json())
    .then((data) => setTeamNamesDropdown(data))
    .catch((error) => console.error("Error fetching data:", error))});

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
    parsedData = data.map(([id, name, birthday, position, pts, as, rbs, blks, stls, trnvs, threeperc, fgperc, ftperc, avgmin]) => ({
      id,
      name,
      birthday,
      position, 
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

  if (!teamNamesDropdown) return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800'>Loading roster stats...</div>
  )

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-black'>
      <h1 className="font-semibold text-xltext-gray-800"> Team Roster Statistics </h1>
      <div className='m-4'>
        {/* <input
          type="text"
          className='mr-4 p-1 rounded-md'
          placeholder="enter team name"
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value)
          }}
        /> */}
          <select
            id="arena-select"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="p-1 mr-4 rounded-lg border"
          >
            <option value="" disabled>Select a team</option>
            {teamNamesDropdown.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        <button className="bg-blue-500 px-2 py-1 rounded-lg text-white" onClick={fetchRosterStats}>Go</button>
      </div>
      
      {(parsedData.length != 0) && (
        <div className='bg-blue-100 rounded-lg '>
          <div className="space-y-3 max-h-[600px] overflow-y-auto p-6">
            <div className="grid grid-cols-1 gap-4">
              {parsedData.map((player) => (
                <div
                  key={player.id}
                  className="grid grid-cols-2 gap-4 bg-white p-4 shadow-md rounded-lg "
                >

                  <div className="text-myblue font-bold">
                    {player.name}
                  </div>
                  <div></div>
                  <div>Birthday</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.birthday}
                  </div>
                  <div>Position</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.position}
                  </div>
                  <div>Avg Pts</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.pts.toFixed(2)}
                  </div>
                  <div>Avg Assists</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.as.toFixed(2)}
                  </div>
                  <div>Avg Rebounds</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.rbs.toFixed(2)}
                  </div>
                  <div>Avg Blocks</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.blks.toFixed(2)}
                  </div>
                  <div>Avg Steals</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.stls.toFixed(2)}
                  </div>
                  <div>Avg Turnovers</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.trnvs.toFixed(2)}
                  </div>
                  <div>Avg Three Point Percentage</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.threeperc.toFixed(2)}
                  </div>
                  <div>Avg Field Goal Percentage</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.fgperc.toFixed(2)}
                  </div>
                  <div>Avg Free Throw Percentage</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.ftperc.toFixed(2)}
                  </div>
                  <div>Avg Minutes Played</div>
                  <div className="text-red-400 font-bold text-right">
                    {player.avgmin.toFixed(2)}
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
