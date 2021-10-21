import {useEffect, useState} from 'react'
import CryptoCurrencyDetails from '../src/components/CryptoCurrencyDetails'
import HistoryChart from '../src/components/HistoryChart'
import Trade from '../src/components/Trade'
import Orders from '../src/components/Orders'
import {currencyName, localStorageKey} from '../src/constants/appConstants'
import {getCryptoCurrencyInfo} from '../src/services/currencyService'
import {getDataFromLocalStorage, setDataToLocalStorage} from '../src/utilities/localStorageUtil'
import Header from "../src/components/Header";

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
        <div className="container-fluid px-0">
            <div className="row mb-4">
                <Header/>
            </div>
            <div className="row mx-2">
                <div className="row">
                    <div className="col-md-8 col-lg-8 col-sm-12 border-end border-warning">
                        <CryptoCurrencyDetails cryptoCurrencyInfo={cryptoCurrencyInfo}/>
                        <HistoryChart/>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-12">
                        <Orders
                            tradeHistory={tradeHistory}
                        />
                    </div>
                </div>

                <div className="row justify-content-md-between border-top border-success">
                    <div className="col-md-4 col-sm-12">
                        <div className="card mt-2">
                            <div className="card-body">
                                <Trade
                                    name={cryptoCurrencyInfo.name}
                                    volume={cryptoCurrencyInfo.volume}
                                    price={cryptoCurrencyInfo.priceUsd}
                                    updateTradeHistory={updateTradeHistory}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;