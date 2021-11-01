import React, { useState } from "react";
import Dropdown from "../FormComponents/Dropdown";
import { currencyList } from "../../constants/currency";
import Input from "../FormComponents/Input";
import Button from "../FormComponents/Button";
import { getCurrentTimestamp } from "../../utilities/dateTimeUtil";
import { ORDER_TYPE, ORDER_STATUS_MAPPING } from "../../constants/appConstants";
import { getCryptoCurrencyInfo } from "../../services/currencyService";
import Tabs from "../formComponents/tab";
import { roundDecimalPlaces } from '../../utilities/commonUtility'

const tabConfig = [
  {
    id: "tab1",
    name: ORDER_TYPE.BUY,
  },
  {
    id: "tab2",
    name: ORDER_TYPE.SELL,
  },
];

const QuickTrade = ({ updateTradeHistory, userWallet }) => {
  const [activeTab, setActiveTab] = useState("tab1"),
    [cryptoName, setCryptoName] = useState(currencyList[0].value),
    [price, setPrice] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const sendNotification = (tradeData) => {
    import("openfin-notifications").then((notification) => {
      notification.create({
        title: `${tradeData.status} Order Submitted!`,
        indicator: {
          text: "Notification Alert",
          color: notification.IndicatorColor.GREEN,
          type: "success",
        },
        category: "Notifications",
        body: `Your ${tradeData.orderType} order for ${tradeData.volume} ${tradeData.currency} was placed successfully for ${tradeData.price}$`,
      });
    });
  };

  async function buySellCryptoCurrency() {
    if (!price) return;

    const marketPrice = await getCryptoCurrencyInfo(cryptoName);

    const tradeData = {
      timestamp: getCurrentTimestamp(),
      currency: cryptoName,
      price: price,
      volume: roundDecimalPlaces((marketPrice.priceUsd / price), 5),
      orderType: activeTab === "tab1" ? ORDER_TYPE.BUY : ORDER_TYPE.SELL,
      status: ORDER_STATUS_MAPPING.IN_PROGRESS,
    };
    updateTradeHistory(tradeData);
    sendNotification(tradeData);
    setPrice("");
  }

  return (
    <div className="section">
      <header>QUICK TRADE</header>
      <Tabs
        activeTab={activeTab}
        tabConfig={tabConfig}
        onTabClick={handleTabClick}
      />
      <div className="content">
        <div className="input-container">
          <Dropdown
            className="form-select-lg w-50 bg-secondary text-white"
            value={cryptoName}
            onChangeHandler={setCryptoName}
            optionList={currencyList}
          />
          <div className="trade-price">
            <Input
              type="text"
              className="text-white"
              value={price}
              onChangeHandler={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div>
          Avl Qty :{" "}
          {userWallet && userWallet[cryptoName] ? userWallet[cryptoName] : 0}
        </div>
        <div className="d-flex justify-content-end">
          <Button onClickHandler={() => setPrice("")}>Cancel</Button>
          <Button disabled={price == ""} onClickHandler={buySellCryptoCurrency}>
            {activeTab === "tab1" ? (
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
