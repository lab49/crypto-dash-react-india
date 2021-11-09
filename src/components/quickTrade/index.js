import React, { useState, useEffect } from "react";
import CurrencyDropdown from "../common/currencyDropdown";
import { currencyList } from "../../constants/currency";
import Input from "../common/input";
import Button from "../common/button";
import { getCurrentTimestamp } from "../../utilities/dateTimeUtil";
import {
  ORDER_TYPE,
  ORDER_STATUS_MAPPING,
  QUICK_TRADE_TAB_CONFIG,
} from "../../constants/appConstants";
import { getCryptoCurrencyInfo } from "../../services/currencyService";
import Tabs from "../common/tab";
import { roundDecimalPlaces } from "../../utilities/commonUtility";

const QuickTrade = ({ updateTradeHistory, userWallet }) => {
  const [activeTab, setActiveTab] = useState("buyTab"),
    [cryptoName, setCryptoName] = useState(currencyList[0].value),
    [inputValue, setInputValue] = useState(""),
    [avlQuantity, setAvlQuantity] = useState(
      userWallet && userWallet[cryptoName] ? userWallet[cryptoName] : 0
    ),
    [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setAvlQuantity(
      userWallet && userWallet[cryptoName] ? userWallet[cryptoName] : 0
    );
  }, [userWallet, cryptoName]);

  const handleTabClick = (tab) => {
    setInputValue("");
    setActiveTab(tab);
    setSliderValue(0);
  };

  const onSliderChage = (e) => {
    const percentage = e.target.value;
    setSliderValue(percentage);
    setInputValue(roundDecimalPlaces(avlQuantity * percentage * 0.01, 5));
  };

  const handleChange = (e) => {
    const re = /^\d*\.?\d*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  async function buySellCryptoCurrency() {
    if (!inputValue) return;

    const cryptoInfo = await getCryptoCurrencyInfo(cryptoName);

    const tradeData = {
      timestamp: getCurrentTimestamp(),
      currency: cryptoName,
      price:
        activeTab === "buyTab"
          ? inputValue
          : roundDecimalPlaces(inputValue * cryptoInfo.priceUsd, 5),
      volume:
        activeTab === "buyTab"
          ? roundDecimalPlaces(inputValue / cryptoInfo.priceUsd, 5)
          : inputValue,
      orderType: activeTab === "buyTab" ? ORDER_TYPE.BUY : ORDER_TYPE.SELL,
      status: ORDER_STATUS_MAPPING.IN_PROGRESS,
    };
    updateTradeHistory(tradeData);
    setInputValue("");
    setSliderValue(0);
  }

  return (
    <div className="section">
      <header>QUICK TRADE</header>
      <Tabs
        activeTab={activeTab}
        tabConfig={QUICK_TRADE_TAB_CONFIG}
        onTabClick={handleTabClick}
      />
      <div className="content">
        <div className="input-container">
          <CurrencyDropdown
            value={cryptoName}
            onChangeHandler={setCryptoName}
            optionList={currencyList}
            keyPrefix="quick-trade"
          />
          <div
            className={`${
              activeTab === "buyTab" ? "trade-price" : "trade-amount"
            } `}
          >
            <Input
              type="text"
              className="text-white"
              value={inputValue}
              onChangeHandler={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div>Avl Qty : {avlQuantity}</div>
        {activeTab === "sellTab" ? (
          <div className="slider">
            <input
              id="amt-slider"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => onSliderChage(e)}
              step="25"
              disabled={avlQuantity == 0}
              className="flex-grow-1"
            />
            <span className="percentage">{`${sliderValue}%`}</span>
          </div>
        ) : (
          <div className="slider"></div>
        )}
        <div className="d-flex justify-content-end">
          <Button onClickHandler={() => setInputValue("")}>Cancel</Button>
          <Button
            disabled={
              inputValue == "" ||
              inputValue == "0" ||
              (activeTab === "sellTab" &&
                (inputValue > avlQuantity || avlQuantity == 0))
            }
            onClickHandler={buySellCryptoCurrency}
          >
            {activeTab === "buyTab" ? (
              <div>{ORDER_TYPE.BUY} </div>
            ) : (
              <div>{ORDER_TYPE.SELL} </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickTrade;
