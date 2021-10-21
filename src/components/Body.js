import CryptoCurrencyDetails from "./CryptoCurrencyDetails";
import HistoryChart from "./HistoryChart";
import Orders from "./Orders";
import Trade from "./Trade";
import {useEffect, useState} from "react";
import {getDataFromLocalStorage, setDataToLocalStorage} from "../utilities/localStorageUtil";
import {currencyName, localStorageKey} from "../constants/appConstants";
import {getCryptoCurrencyInfo} from "../services/currencyService";

const Body = () => {

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
    )
}

export default Body;