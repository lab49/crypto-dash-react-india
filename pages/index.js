import React, { useState } from "react";
import CurrencyMarketToday from "../src/components/currencyMarketToday";
import Orders from "../src/components/orders";
import QuickTrade from "../src/components/quickTrade";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../src/utilities/localStorageUtil";
import { LOCAL_STORAGE_KEY, ORDER_TYPE, ORDER_STATUS_MAPPING, TIME_INTERVAL } from "../src/constants/appConstants";
import CurrencyHistoryChart from "../src/components/liveChart";

const CryptoExchange = () => {
  const currencyTradeHistory = getDataFromLocalStorage(
    LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY
  );
  const [tradeHistory, setTradeHistory] = useState(currencyTradeHistory);

  const userAccountWallet = getDataFromLocalStorage(
    LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET
  );
  const [userWallet, setUserWallet] = useState(
    userAccountWallet === null ? {} : userAccountWallet
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
    userWallet[currencyName] = userWallet[currencyName]
      ? ORDER_TYPE.BUY === tradeData.orderType
        ? userWallet[currencyName] + tradeData.volume
        : userWallet[currencyName] - tradeData.volume
      : tradeData.volume;
    setUserWallet(userWallet);
    setDataToLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET, userWallet);
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
    <div className=" row col-11 flex-column main-content">
      <div className="row flex-grow-1">
        <div className="col-7 d-flex flex-column">
          <section className="largest-movers">
            <CurrencyMarketToday />
          </section>
          <section className="live-chart">
            <CurrencyHistoryChart
                isAreaType={true}
            />
          </section>
        </div>
        <div className="col-5 d-flex flex-column">
          <section className="quick-trade">
            <QuickTrade
              updateTradeHistory={updateTradeHistory}
              userWallet={userWallet}
            />
          </section>
          <section className="orders">
            <Orders tradeHistory={tradeHistory} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default CryptoExchange;
