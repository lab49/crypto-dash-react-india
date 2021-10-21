import { useEffect, useState } from 'react'
import Header from '../src/components/Header'
import HistoryChart from '../src/components/HistoryChart'
import Trade from '../src/components/Trade'
import Orders from '../src/components/Orders'
import { currencyName, localStorageKey } from '../src/constants/appConstants'
import { getCryptoCurrencyInfo } from '../src/services/currencyService'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../src/utilities/localStorageUtil'

const Home = () => {

  const [cryptoCurrencyInfo, setCryptoCurrencyInfo] = useState({}),
    currencyTradeHistory = getDataFromLocalStorage(localStorageKey.CURRENCY_TRADE_HISTORY),
    [tradeHistory, setTradeHistory] = useState(currencyTradeHistory);

  useEffect(() => {
    getCryptoCurrencyInfo(currencyName)
      .then((info) => {
        setCryptoCurrencyInfo(info)
      });
  }, [])

  const updateTradeHistory = (tradeData) => {
    const mofifiedTradeHistory = Array.isArray(tradeHistory) ?
      tradeHistory.concat(tradeData) :
      [tradeData];

    setDataToLocalStorage(localStorageKey.CURRENCY_TRADE_HISTORY, mofifiedTradeHistory)
    setTradeHistory(mofifiedTradeHistory)
  }

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
            updateTradeHistory={updateTradeHistory}
          />
        </div>
        <div className="col-lg-6">
          <Orders
            tradeHistory={tradeHistory}
          />
        </div>
      </div>
    </div>
  )
}

export default Home;