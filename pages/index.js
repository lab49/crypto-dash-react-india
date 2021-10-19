import { useEffect, useState } from 'react'
import Header from '../src/components/Header'
import HistoryChart from '../src/components/HistoryChart'
import Trade from '../src/components/Trade'
import Orders from '../src/components/Orders'
import { coinName } from '../src/constants/appConstants'
import { getCryptoCurrencyInfo } from '../src/services/currencyService'

const Home = () => {

  const [cryptoCurrencyInfo, setCryptoCurrencyInfo] = useState({});

  useEffect(() => {
    getCryptoCurrencyInfo(coinName)
      .then((info) => {
        setCryptoCurrencyInfo(info)
      });
  }, [])

  return (
    <div className="p-3">
      <Header cryptoCurrencyInfo={cryptoCurrencyInfo} />
      <HistoryChart />
      <div className="row justify-content-md-between mt-4">
        <div className="col-lg-4">
          <Trade
            name={cryptoCurrencyInfo.name}
            volume={cryptoCurrencyInfo.volume}
            price={cryptoCurrencyInfo.priceUsd}
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