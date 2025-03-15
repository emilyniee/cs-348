import Link from 'next/link';

export default function HomePage() {

  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen bg-blue-200'>
    <div className="flex-col justify-items-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">NBA</h1>

        <div className="flex justify-center gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col justify-center h-100 w-80">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">NBA Legends</h3>
            <p className="text-gray-600 mb-6">Find the top players of all time</p>
            <Link href="/leaderboard" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col justify-center h-100 w-80">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Matchups</h3>
            <p className="text-gray-600 mb-6">Find the best/worst matchups for your favourite team</p>
            <Link href="/matchups" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col justify-center h-100 w-80">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Birthdays</h3>
            <p className="text-gray-600 mb-6">Find players that share your birthday!</p>
            <Link href="/birthdays" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
        </div>
    </div>
    </div>
  );
}
