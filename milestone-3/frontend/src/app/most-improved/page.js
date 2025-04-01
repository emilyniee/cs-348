"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/most_improved_teams")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-gray-800">
        Loading ...
      </div>
    );
  }

  // Parse data
  const parsedData = data.map(
    ([
      team,
      first_half_wins,
      first_half_games,
      first_half_win_pct,
      second_half_wins,
      second_half_games,
      second_half_win_pct,
      win_pct_change,
    ]) => ({
      team,
      first_half_wins,
      first_half_games,
      first_half_win_pct,
      second_half_wins,
      second_half_games,
      second_half_win_pct,
      win_pct_change,
    })
  );

  // Get min/max win percentage change for scaling
  const minWinPctChange = Math.min(...parsedData.map((t) => t.win_pct_change));
  const maxWinPctChange = Math.max(...parsedData.map((t) => t.win_pct_change));

  // Function to generate background color based on win percentage change
  const getBackgroundColor = (value) => {
    const normalized = (value - minWinPctChange) / (maxWinPctChange - minWinPctChange);
    const intensity = Math.pow(normalized, 2); // Square it for more extreme contrast

    if (value >= 0) {
      return `rgba(0, 150, 0, ${0.1 + 0.9 * intensity})`; // Darker green for big improvements
    } else {
      return `rgba(200, 0, 0, ${0.1 + 0.9 * (1 - intensity)})`; // Darker red for big declines
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200">
      <h1 className="font-semibold text-xl text-gray-800 m-2">
        Teams with the most improvement 📈
      </h1>
      <h2 className="font-semibold text-l text-gray-800 m-2">
        Comparing win percentage at the first half of a season to the win percentage at the second
        half of the season
      </h2>
      <div className="bg-blue-100 rounded-lg">
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-6">
          <div className="grid grid-cols-8 gap-4 font-semibold text-lg text-gray-800 bg-blue-200 p-4 rounded-t-lg">
            <div>Team</div>
            <div>First Half Wins</div>
            <div>First Half Total Games</div>
            <div>First Half Win %</div>
            <div>Second Half Wins</div>
            <div>Second Half Total Games</div>
            <div>Second Half Win %</div>
            <div>Win % Improvement</div>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {parsedData.map((team) => (
              <div
                key={team.team}
                className="grid grid-cols-8 gap-4 bg-white p-4 shadow-md rounded-lg"
              >
                <div className="font-semibold text-lg text-gray-800">{team.team}</div>
                <div className="font-semibold text-lg text-gray-800">{team.first_half_wins}</div>
                <div className="font-semibold text-lg text-gray-800">{team.first_half_games}</div>
                <div className="font-semibold text-lg text-gray-800">
                  {team.first_half_win_pct.toFixed(3)}%
                </div>
                <div className="font-semibold text-lg text-gray-800">{team.second_half_wins}</div>
                <div className="font-semibold text-lg text-gray-800">{team.second_half_games}</div>
                <div className="font-semibold text-lg text-gray-800">
                  {team.second_half_win_pct.toFixed(3)}%
                </div>
                <div
                  className="font-semibold text-lg text-gray-800 p-2 rounded-md"
                  style={{ backgroundColor: getBackgroundColor(team.win_pct_change) }}
                >
                  {team.win_pct_change.toFixed(3)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
