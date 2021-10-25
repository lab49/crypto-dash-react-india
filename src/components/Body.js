import CryptoCurrencyDetails from "./CryptoCurrencyDetails";
import HistoryChart from "./HistoryChart";
import Orders from "./Orders";
import Trade from "./Trade";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../utilities/localStorageUtil";
import { localStorageKey } from "../constants/appConstants";
import { getCryptoCurrencyInfo } from "../services/currencyService";
import { currencyList, getDefaultCurrencyValue } from "../constants/currency";

const Body = () => {

    const [currencyName, setCurrencyName] = useState(getDefaultCurrencyValue()),
        [cryptoCurrencyInfo, setCryptoCurrencyInfo] = useState({}),
        currencyTradeHistory = getDataFromLocalStorage(localStorageKey.CURRENCY_TRADE_HISTORY),
        [tradeHistory, setTradeHistory] = useState(currencyTradeHistory);

    useEffect(() => {
        getCryptoCurrencyInfo(currencyName)
            .then((info) => {
                setCryptoCurrencyInfo(info)
            });
    }, [currencyName])

    const updateTradeHistory = (tradeData) => {
        const mofifiedTradeHistory = Array.isArray(tradeHistory) ?
            tradeHistory.concat(tradeData) :
            [tradeData];

        setDataToLocalStorage(localStorageKey.CURRENCY_TRADE_HISTORY, mofifiedTradeHistory)
        setTradeHistory(mofifiedTradeHistory)
    }

    return (
        <div className="body row mx-2 py-4">
            <div className="row">
                <div className="col-lg-6">
                    <select
                        className="form-select form-select-lg mb-3 bg-secondary text-white"
                        onChange={(event) => setCurrencyName(event.target.value)}
                        value={currencyName}
                    >
                        {
                            currencyList.map(({ label, value }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))
                        }
                    </select>
                    <CryptoCurrencyDetails
                        currencyName={currencyName}
                        cryptoCurrencyInfo={cryptoCurrencyInfo}
                    />
                </div>
                <div className="col-lg-6">
                    <div className="card bg-transparent border-light">
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
            <div className="row pr-0">
                <div className="col-lg-6">
                    <HistoryChart
                        currencyName={currencyName}
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

export default Body;