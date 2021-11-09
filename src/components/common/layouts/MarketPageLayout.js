import React from "react";

const MarketPageLayout = ({topMarketMoversComponent, liveChartComponent, quickTradeComponent, orderHistoryComponent}) => {
    return (
        <div className=" row col-11 flex-column main-content">
            <div className="row flex-grow-1">
                <div className="col-7 d-flex flex-column">
                    <section className="largest-movers">
                        {topMarketMoversComponent}
                    </section>
                    <section className="live-chart">
                        {liveChartComponent}
                    </section>
                </div>
                <div className="col-5 d-flex flex-column">
                    <section className="quick-trade">
                        {quickTradeComponent}
                    </section>
                    <section className="orders">
                        {orderHistoryComponent}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default MarketPageLayout;