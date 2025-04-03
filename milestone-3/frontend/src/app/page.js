import Link from 'next/link';
import Image from "next/image";

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
        <div className="grid grid-cols-4 bg-white p-8 rounded-md items-center">
          <Image 
              src="/images/triple-double.png" 
              alt="Triple Double" 
              width={80} 
              height={80}>
          </Image>
          <div className="col-span-3 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Triple Doubles</h3>
            <p className="text-gray-600">Find players with the most triple doubles </p>
            <Link href="/triple-doubles" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
          
        </div>
        <div className="grid grid-cols-4 bg-white p-8 rounded-md items-center">
          <Image 
            src="/images/birthday.png"
            alt="Birthday" 
            width={80} 
            height={80}>
          </Image>
          <div className="col-span-3 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Birthdays</h3>
            <p className="text-gray-600">Find players that share your birthday!</p>
            <Link href="/birthdays" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
        </div>
        <div className="grid grid-cols-4 bg-white p-8 rounded-md items-center">
          <Image 
            src="/images/benchwarmer.png" 
            alt="Benchwarmers" 
            width={80} 
            height={80}>
          </Image>
          <div className="col-span-3 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Benchwarmers</h3>
            <p className="text-gray-600">Check out players with less than 15 avg minutes and rounded per36 stats!</p>
            <Link href="/benchwarmers" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
        </div>
        <div className="grid grid-cols-4 bg-white p-8 rounded-md items-center">
          <Image 
            src="/images/position.png" 
            alt="Position" 
            width={80} 
            height={80}>
          </Image>
          <div className="col-span-3 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700">Position Comparison</h3>
            <p className="text-gray-600">Compare stats for a given position!</p>
            <Link href="/position-comparison" className="text-blue-500 hover:text-blue-700">Click Here</Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 col-span-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-4 bg-white p-8 rounded-md items-center">
              <div className="col-span-3 flex flex-col justify-center mr-4">
                <h3 className="text-2xl font-semibold text-gray-700">Arena Stats</h3>
                <p className="text-gray-600">Checkout Arena stats for home and away teams!</p>
                <Link href="/arena-stats" className="text-blue-500 hover:text-blue-700">Click Here</Link>
              </div>
              <Image 
                src="/images/arena.png" 
                alt="Arena" 
                width={120} 
                height={120}>
              </Image>
            </div>
            <div className="grid grid-cols-4 bg-white p-8 rounded-md items-center">
              <div className="col-span-3 flex flex-col justify-center mr-4">
                <h3 className="text-2xl font-semibold text-gray-700">Roster Stats</h3>
                <p className="text-gray-600">Find the average points for each player of your favourite team!</p>
                <Link href="/roster-stats" className="text-blue-500 hover:text-blue-700">Click Here</Link>
              </div>
              <Image 
                src="/images/roster.png" 
                alt="Roster" 
                width={120} 
                height={120}>
              </Image>
            </div>
          </div>
          <div className="grid grid-cols-3 bg-white p-8 rounded-md items-center">
            <div className="col-span-2 flex flex-col justify-center mr-4">
              <h3 className="text-2xl font-semibold text-gray-700">NBA Legends</h3>
              <p className="text-gray-600">Find the top players of the 23-24 season</p>
              <Link href="/leaderboard" className="text-blue-500 hover:text-blue-700">Click Here</Link>
            </div>
            <Image 
              src="/images/legends.png" 
              alt="NBA Legends" 
              width={150} 
              height={150}>
            </Image>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-1 bg-white p-8 rounded-md items-center">
            <div className="flex flex-col justify-center mr-4">
              <h3 className="text-2xl font-semibold text-gray-700">Matchups</h3>
              <p className="text-gray-600">Find the best/worst matchups for your favourite team!</p>
              <Link href="/matchups" className="text-blue-500 hover:text-blue-700">Click Here</Link>
            </div>
            <Image 
              src="/images/matchup.png" 
              alt="Matchups" 
              width={120} 
              height={120}>
            </Image>
          </div>
          <div className="grid grid-cols-1 bg-white p-8 rounded-md items-center">
            <div className="flex flex-col justify-center mr-4">
              <h3 className="text-2xl font-semibold text-gray-700">Most Improved</h3>
              <p className="text-gray-600">Teams with the most improvement in the season</p>
              <Link href="/most-improved" className="text-blue-500 hover:text-blue-700">Click Here</Link>
            </div>
            <Image 
              src="/images/most-imp.png" 
              alt="Most improved" 
              width={120} 
              height={120}>
            </Image>
          </div>
          <div className="grid grid-cols-1 bg-white p-8 rounded-md items-center">
            <div className="flex flex-col justify-center mr-4">
              <h3 className="text-2xl font-semibold text-gray-700">Win Streaks</h3>
              <p className="text-gray-600">Find the teams with the longest win streaks!</p>
              <Link href="/winstreaks" className="text-blue-500 hover:text-blue-700">Click Here</Link>
            </div>
            <Image 
              src="/images/winstreak.png" 
              alt="Winstreak" 
              width={120} 
              height={120}>
            </Image>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}
