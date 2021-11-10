import React, {useState} from "react";
import MarketPageLayout from "../src/components/common/layouts/MarketPageLayout";
import CurrencyHistoryChart from "../src/components/liveChart";
import QuickTrade from "../src/components/quickTrade";
import Orders from "../src/components/orders";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../src/utilities/localStorageUtil";
import { LOCAL_STORAGE_KEY, ORDER_STATUS_MAPPING, ORDER_TYPE, TIME_INTERVAL } from "../src/constants/appConstants";

const CryptoExchange = () => {
  const [tradeHistory, setTradeHistory] = useState(getDataFromLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY));

  const [userWallet, setUserWallet] = useState(() => {
    const userAccountWallet = getDataFromLocalStorage(
      LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET
    );
    return userAccountWallet ? userAccountWallet : {};
  });

  const updateTradeHistory = (tradeData) => {
    const modifiedTradeHistory = Array.isArray(tradeHistory)
      ? [tradeData, ...tradeHistory]
      : [tradeData];

    // update DB/Local Storage
    setDataToLocalStorage(
      LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY,
      modifiedTradeHistory
    );

    //update TradeHistory state
    setTradeHistory(modifiedTradeHistory);

    //Execute order
    updateTradeStatus(tradeData);
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
        //If order is success, update user wallet
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

  const updateUserWallet = (tradeData) => {
    const currencyName = tradeData.currency;
    const updatedWallet = {
      ...userWallet,
      [currencyName]: userWallet[currencyName]
        ? ORDER_TYPE.BUY === tradeData.orderType
          ? userWallet[currencyName] + tradeData.volume
          : userWallet[currencyName] - tradeData.volume
        : tradeData.volume,
    };
    setUserWallet(updatedWallet);
    //Persist in DB/Local Storage
    setDataToLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET, updatedWallet);
  };

  return (
    <MarketPageLayout
      topMarketMoversComponent={""}
      liveChartComponent={<CurrencyHistoryChart isAreaType={true} />}
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
