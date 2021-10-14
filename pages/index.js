import { useEffect, useState } from 'react'
import Header from '../src/components/Header'
import HistoryChart from '../src/components/HistoryChart'
import Trade from '../src/components/Trade'
import Orders from '../src/components/Orders'
import { coinName } from '../src/utilities/appConstants'
import { getApiData } from '../src/utilities/apiUtility'
import { getApiEndpoints } from '../src/utilities/commonUtility'

const Home = () => {

  const [coinInfo, setCoinInfo] = useState({});

  useEffect(() => {
    getApiData(getApiEndpoints('assetInfo', { coinName }))
      .then(resp => {
        const asset = resp?.data?.data
        if (asset) {
          setCoinInfo({
            name: asset.name,
            symbol: asset.symbol,
            priceUsd: asset.priceUsd,
            diff: asset.priceUsd / (1 + asset.changePercent24Hr / 100),
            percentage: asset.changePercent24Hr,
            volume: asset.volumeUsd24Hr / asset.priceUsd
          })
        }
      })
  }, [])

  return (
    <div className="p-3">
      <Header coinInfo={coinInfo} />
      <HistoryChart />
      <div className="row justify-content-md-between mt-4">
        <div className="col-lg-4">
          <Trade
            coinName={coinInfo.name}
            volume={coinInfo.volume}
            price={coinInfo.priceUsd}
          />
        </div>
        <div className="col-lg-6">
          <Orders />
        </div>
      </div>
    </div>
  )
}

export default Home;