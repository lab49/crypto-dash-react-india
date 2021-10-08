import Header from '../src/components/Header'
import HistoryChart from '../src/components/HistoryChart'
import Trade from '../src/components/Trade'
import Orders from '../src/components/Orders'
import { useEffect, useState } from 'react'
import { asset } from '../src/utilities/sampleJson'

export default function Home() {

  const [coinInfo, setCoinInfo] = useState({}),
    coinPrice = 6753.9822;

  useEffect(() => {
    setCoinInfo({
      name: asset.name,
      symbol: asset.symbol,
      diff: "-0.82",
      percentage: "7.65",
      volume: asset.volumeUsd24Hr
    })
  }, [])

  return (
    <div className="p-3">
      <Header
        data={{ ...coinInfo, price: coinPrice }}
      />
      <HistoryChart
        data={{
          dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          points: [[2, 1], [3, 12], [5, 2], [7, 1], [9, 3]]
        }}
      />
      <div className="row justify-content-md-between mt-4">
        <div className="col-md-5">
          <Trade
            volume={coinInfo.volume}
            price={coinPrice}
          />
        </div>
        <div className="col-md-5">
          <Orders />
        </div>
      </div>
    </div>
  )
}
