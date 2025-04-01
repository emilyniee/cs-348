import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-blue-100">
      <aside className="bg-myblue text-center shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-white">N</h2>
        <h2 className="text-2xl font-bold text-white">B</h2>
        <h2 className="text-2xl font-bold text-white mb-4">A</h2>
      </aside>
    <div className="grid grid-cols-3 gap-4 ml-4 p-8">
      <div className="grid grid-cols-1 gap-4 col-span-1">
        <div className="bg-white p-8 rounded-md flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-700">Triple Doubles</h3>
          <p className="text-gray-600">Find players with the most triple doubles 😈</p>
          <Link href="/triple-doubles" className="text-blue-500 hover:text-blue-700">Click Here</Link>
        </div>
        <div className="bg-white p-8 rounded-md flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-700">Birthdays</h3>
          <p className="text-gray-600">Find players that share your birthday!</p>
          <Link href="/birthdays" className="text-blue-500 hover:text-blue-700">Click Here</Link>
        </div>
        <div className="bg-white p-8 rounded-md flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-700">Benchwarmers</h3>
          <p className="text-gray-600">Check out players with less than 15 avg minutes and rounded per36 stats!</p>
          <Link href="/benchwarmers" className="text-blue-500 hover:text-blue-700">Click Here</Link>
        </div>
        <div className="bg-white p-8 rounded-md flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Position Comparison</h3>
          <p className="text-gray-600 mb-6">Compare stats for a given position!</p>
          <Link href="/position-comparison" className="text-blue-500 hover:text-blue-700">Click Here</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 col-span-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-8 rounded-md flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-700">Arena Stats</h3>
              <p className="text-gray-600">Find players that share your birthday!</p>
              <Link href="/arena-stats" className="text-blue-500 hover:text-blue-700">Click Here</Link>
            </div>
            <div className="bg-white p-8 rounded-md flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-700">Roster Stats</h3>
              <p className="text-gray-600">Find the average points for each player of your favourite team!</p>
              <Link href="/roster-stats" className="text-blue-500 hover:text-blue-700">Click Here</Link>
            </div>
          </div>
          <div className="bg-white p-8 rounded-md flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">NBA Legends</h3>
            <p className="text-gray-600">Find the top players of all time</p>
            <Link href="/leaderboard" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-8 rounded-md flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Matchups</h3>
            <p className="text-gray-600">Find the best/worst matchups for your favourite team!</p>
            <Link href="/matchups" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
          <div className="bg-white p-8 rounded-md flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Most Improved</h3>
            <p className="text-gray-600">Teams with the most improvement in the season</p>
            <Link href="/most-improved" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
          <div className="bg-white p-8 rounded-md flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Win Streaks</h3>
            <p className="text-gray-600">Find the teams with the longest win streaks!</p>
            <Link href="/winstreaks" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}
