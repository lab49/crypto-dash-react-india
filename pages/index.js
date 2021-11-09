import React from "react";
import MarketPageLayout from "../src/components/common/layouts/MarketPageLayout";

const CryptoExchange = () => {
    return (
        <MarketPageLayout
            topMarketMoversComponent={''}
            liveChartComponent={''}
            quickTradeComponent={''}
            orderHistoryComponent={''}
        />
    );
};

export default CryptoExchange;
