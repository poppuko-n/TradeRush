import TopImage from './assets/ranking_top.svg'
import First from './assets/ranking_first.svg'
import Secount from './assets/ranking_secound.svg'
import Third from './assets/ranking_third.svg'
import Forth from './assets/ranking_forth.svg'
import Fifth from './assets/ranking_fifth.svg'
import LeftWomen from './assets/ranking_left.svg'
import RightWomen from './assets/ranking_right.svg'

const Ranking = () => {
  const users = [
    { name: 'hoge', capital: 2500000 },
    { name: 'huga', capital: 2400000 },
    { name: 'hoge', capital: 2300000 },
    { name: 'huga', capital: 2200000 },
    { name: 'hoge', capital: 2100000 }
  ];

  const medals = [First, Secount, Third, Forth, Fifth];

  return(
    <div className='flex flex-col items-center justify-center'>

      {/* トップ表示 */}
      <div className='flex flex-row items-center space-x-4 mb-4'>
        <h1 className='font-mono text-[50px]'>Ranking</h1>
        <img 
        src={TopImage} 
        alt="ランキングトップ"
        className='h-[150px] w-[150px]' />
      </div>

      <div className='flex flex-row gap-[200px]'>
        {/* 左側の女性 */}
        <img 
        src={LeftWomen} 
        alt="左側の女性"
        className='h-[240px] w-[240px] self-end' />

        {/* ユーザー一覧 */}
        <div className="w-full max-w-xl">
          <table className="table-auto w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="text-2xl p-2 w-[80px]">Rank</th>
                <th className="text-center text-2xl p-2">Name</th>
                <th className="text-2xl p-2">Capital</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b">

                  <td className="text-center text-2xl font-bold">{index + 1}</td>

                  <td className="p-2 px-10">
                    <div className="flex items-center space-x-10">
                      <img
                        src={medals[index]}
                        alt={`${index + 1}位のメダル`}
                        className="h-[60px] w-[60px]"
                      />
                      <span className="text-2xl font-semibold">{user.name}</span>
                    </div>
                  </td>

                  <td className="p-2 text-2xl text-gray-600">
                    ¥{user.capital.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 右側の女性 */}
        <img 
        src={RightWomen} 
        alt="右側の女性"
        className='h-[240px] w-[240px] self-end' />
      </div>

    </div>
  )
}

export default Ranking;