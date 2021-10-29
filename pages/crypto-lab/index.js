import React, { useState } from "react";
import CurrencyMarketToday from '../../src/components/currencyMarketToday';
import Orders from '../../src/components/orders';
import { getDataFromLocalStorage } from '../../src/utilities/localStorageUtil';
import { LOCAL_STORAGE_KEY } from '../../src/constants/appConstants';

const CryptoExchange = () => {
    const currencyTradeHistory = getDataFromLocalStorage(LOCAL_STORAGE_KEY.CURRENCY_TRADE_HISTORY);
    const [tradeHistory, setTradeHistory] = useState(currencyTradeHistory);

    return (
        <div className="app-background">
            <div className="container-fluid text-white row app-body">
                <nav className="col-1 block-card side-bar"> SIDE BAR COMPONENT</nav>
                <div className=" row col-11 flex-column main">
                    {/*<div className="row search-bar">SEARCH BAR COMPONENT</div>*/}
                    <div className="row flex-grow-1">
                        <div className="col-7 d-flex flex-column">
                            <section className="largest-movers">
                                <CurrencyMarketToday />
                            </section>
                            <section className="live-chart">LIVE CHART COMPONENT</section>
                        </div>
                        <div className="col-5 d-flex flex-column">
                            <section className="quick-trade">QUICK TRADE COMPONENT</section>
                            <section className="orders">
                                <Orders
                                    tradeHistory={tradeHistory}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoExchange;
