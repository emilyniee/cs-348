"use client"; 

import { useState, useEffect} from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen bg-blue-200'>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
