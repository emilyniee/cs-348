"use client"; 
import { useState} from 'react';

export default function Home() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [data, setData] = useState(null);

  const [fillerText, setFillerText] = useState("");

  const fetchBirthdays = () => {
    if (!month || !day) return;

    fetch(`http://localhost:8000/birthdays?month=${month}&day=${day}`)
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
    parsedData = data.map(([name, birthday]) => ({
      name,
      birthday
    }));
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-blue-200 text-black'>
      <div className='m-4'>
      <input
        type="text"
        className='mr-4 w-12 p-1 rounded-md'
        placeholder="(MM)"
        value={month}
        onChange={(e) => {
          setMonth(e.target.value)
        }}
      />
       <input
        type="text"
        className='mr-4 w-12 p-1 rounded-md'
        placeholder="(DD)"
        value={day}
        onChange={(e) => {
          setDay(e.target.value)
        }}
      />
      <button className="bg-blue-500 px-2 py-1 rounded-lg text-white" onClick={fetchBirthdays}>Get Birthdays</button>
      </div>

      {(parsedData.length != 0) && (
      <div className='bg-blue-100 text-center p-4 rounded-lg'>
        <h1 className="font-semibold text-xl text-gray-800"> Players that share a birthday </h1>
        <div className="space-y-3 max-h-72 overflow-y-auto p-6">
          {parsedData.map((player) => (
            <div
              key={player.name}
              className="flex items-center justify-between bg-white px-4 py-2 shadow-md rounded-lg"
            >
              <div className="font-semibold text-lg text-gray-800 mr-4">{player.name}</div>
              <div className="text-red-400 font-bold">{player.birthday}</div>
            </div>
          ))}
        </div>
      </div>)}

        {/* <div className="space-y-3 max-h-72 overflow-y-auto">
          {fillerText}
        </div> */}

    </div>
  );
}
