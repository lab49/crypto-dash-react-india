import CryptoCurrencyDetails from "./CryptoCurrencyDetails";
import HistoryChart from "./HistoryChart";
import Orders from "./Orders";
import Trade from "./Trade";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../utilities/localStorageUtil";
import { LOCAL_STORAGE_KEY, ORDER_TYPE, ORDER_STATUS_MAPPING, TIME_INTERVAL } from "../constants/appConstants";
import { getCryptoCurrencyInfo } from "../services/currencyService";
import { getDefaultCurrencyValue } from "../constants/currency";
import CurrencyMarketToday from "./CurrencyMarketToday.js";

const Body = () => {

    const [currencyName, setCurrencyName] = useState(getDefaultCurrencyValue()),
        [cryptoCurrencyInfo, setCryptoCurrencyInfo] = useState({}),
        currencyTradeHistory = getDataFromLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY),
        [tradeHistory, setTradeHistory] = useState(currencyTradeHistory);

    const userAccountWallet = getDataFromLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET);
    const [userWallet, setUserWallet] = useState(userAccountWallet === null ? {} : userAccountWallet);

    useEffect(() => {
        getCryptoCurrencyInfo(currencyName)
            .then((info) => {
                setCryptoCurrencyInfo(info)
            });
    }, [currencyName])

    function updateCurrencyCount(tradeData) {
        const currencyName = tradeData.currency;
        userWallet[currencyName] = userWallet[currencyName] ?
            ORDER_TYPE.BUY === tradeData.orderType ? (userWallet[currencyName] + tradeData.volume)
                : (userWallet[currencyName] - tradeData.volume)
            : tradeData.volume;
        setUserWallet(userWallet);
    }

    const updateUserWallet = (tradeData) => {
        updateCurrencyCount(tradeData);
        setDataToLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET, userWallet)
    }

    const updateTradeHistory = (tradeData) => {
        const modifiedTradeHistory = Array.isArray(tradeHistory) ?
            tradeHistory.concat(tradeData) :
            [tradeData];

        setDataToLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY, modifiedTradeHistory)
        setTradeHistory(modifiedTradeHistory)
        updateTradeStatus(tradeData)
    }

    const updateTradeStatus = (tradeData) => {
        const randomNumber = Math.random();
        const modifiedTradeHistory = getDataFromLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY);
        setTimeout(() => {
            const tradeIndex = modifiedTradeHistory.findIndex(({ timestamp }) => timestamp === tradeData.timestamp);
            let status;

            if (randomNumber > 0.5) {
                status = ORDER_STATUS_MAPPING.COMPLETED;
                updateUserWallet(tradeData)
            } else {
                status = ORDER_STATUS_MAPPING.EXPIRED
            }

            modifiedTradeHistory[tradeIndex] = {
                ...tradeData,
                status,
            }

            setDataToLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY, modifiedTradeHistory)
            setTradeHistory(modifiedTradeHistory)
        }, randomNumber * TIME_INTERVAL.ORDER_STATUS_SYNC)
    }

    return (
        <div className="body row mx-2 py-4">
            <div className="row">
                <div className="col-3">
                    <CryptoCurrencyDetails
                        currencyName={currencyName}
                        setCurrencyName={setCurrencyName}
                        cryptoCurrencyInfo={cryptoCurrencyInfo}
                    />
                </div>
                <div className="col-5">
                    <CurrencyMarketToday/>
                </div>
                <div className="col-4">
                    <div className="card bg-transparent border-light">
                        <div className="card-body">
                            <Trade
                                name={cryptoCurrencyInfo.name}
                                volume={cryptoCurrencyInfo.volume}
                                price={cryptoCurrencyInfo.priceUsd}
                                updateTradeHistory={updateTradeHistory}
                                availableQty={userWallet[cryptoCurrencyInfo.name]}
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