import { useEffect, useState } from 'react'
import Header from '../src/components/Header'
import HistoryChart from '../src/components/HistoryChart'
import Trade from '../src/components/Trade'
import Orders from '../src/components/Orders'
import { coinName, getApiEndpoints } from '../src/utilities/appConstants'
import { getApiData } from '../src/utilities/apiUtility'

export default function Home() {

  const [coinInfo, setCoinInfo] = useState({}),
    [coinPrice, setCoinPrice] = useState(0);

  useEffect(() => {
    const pricesWs = new WebSocket(getApiEndpoints('assetPrice', { coinName }));
    pricesWs.onmessage = function (msg) {
      setCoinPrice(JSON.parse(msg.data)[coinName])
    }

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

    return () => {
      pricesWs.close()
    }
  }, [])

  return (
    <div className="p-3">
      <Header
        data={{ ...coinInfo, price: coinPrice }}
      />
      <HistoryChart />
      <div className="row justify-content-md-between mt-4">
        <div className="col-md-5">
          <Trade
            volume={coinInfo.volume}
            price={coinInfo.priceUsd}
          />
        </div>
        <div className="col-md-5">
          <Orders />
        </div>
      </div>
    </div>
  )
}
