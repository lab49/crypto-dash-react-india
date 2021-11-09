import React, { useState } from "react";
import CurrencyMarketToday from "../src/components/currencyMarketToday";
import Orders from "../src/components/orders";
import QuickTrade from "../src/components/quickTrade";
import { getDataFromLocalStorage, setDataToLocalStorage, } from "../src/utilities/localStorageUtil";
import { LOCAL_STORAGE_KEY, ORDER_STATUS_MAPPING, ORDER_TYPE, TIME_INTERVAL } from "../src/constants/appConstants";
import CurrencyHistoryChart from "../src/components/liveChart";
import MarketPageLayout from "../src/components/common/layouts/MarketPageLayout";


const CryptoExchange = () => {
    const [tradeHistory, setTradeHistory] = useState(getDataFromLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY));


    const [userWallet, setUserWallet] = useState(() => {
            const userAccountWallet = getDataFromLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET);
            return userAccountWallet ? userAccountWallet : {}
        }
    );

    const updateTradeHistory = (tradeData) => {
        const modifiedTradeHistory = Array.isArray(tradeHistory)
            ? tradeHistory.concat(tradeData)
            : [tradeData];

        setDataToLocalStorage(
            LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY,
            modifiedTradeHistory
        );
        setTradeHistory(modifiedTradeHistory);
        updateTradeStatus(tradeData);
    };

    const updateUserWallet = (tradeData) => {
        const currencyName = tradeData.currency;
        const updatedWallet = {
            ...userWallet,
            [currencyName]:
                userWallet[currencyName]
                    ? ORDER_TYPE.BUY === tradeData.orderType
                    ? userWallet[currencyName] + tradeData.volume
                    : userWallet[currencyName] - tradeData.volume
                    : tradeData.volume
        };
        setUserWallet(updatedWallet);
        setDataToLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET, updatedWallet);
    };

    const updateTradeStatus = (tradeData) => {
        const randomNumber = Math.random();
        setTimeout(() => {
            let modifiedTradeHistory = getDataFromLocalStorage(
                LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY
            );
            const tradeIndex = modifiedTradeHistory.findIndex(
                ({ timestamp }) => timestamp === tradeData.timestamp
            );
            let status;

            if (randomNumber > 0.25) {
                status = ORDER_STATUS_MAPPING.COMPLETED;
                updateUserWallet(tradeData);
            } else {
                status = ORDER_STATUS_MAPPING.EXPIRED;
            }

            modifiedTradeHistory[tradeIndex] = {
                ...tradeData,
                status,
            };

            setDataToLocalStorage(
                LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY,
                modifiedTradeHistory
            );
            setTradeHistory(modifiedTradeHistory);
        }, randomNumber * TIME_INTERVAL.ORDER_STATUS_SYNC);
    };

    return (
        <MarketPageLayout
            topMarketMoversComponent={<CurrencyMarketToday/>}
            liveChartComponent={
                <CurrencyHistoryChart
                    isAreaType={true}
                />
            }
            quickTradeComponent={
                <QuickTrade
                    updateTradeHistory={updateTradeHistory}
                    userWallet={userWallet}
                />
            }
            orderHistoryComponent={<Orders tradeHistory={tradeHistory}/>}
        />
    );
};

export default CryptoExchange;
