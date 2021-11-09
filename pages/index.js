import React from "react";
import MarketPageLayout from "../src/components/common/layouts/MarketPageLayout";
import CurrencyHistoryChart from "../src/components/liveChart";

const CryptoExchange = () => {
    return (
        <MarketPageLayout
            topMarketMoversComponent={''}
            liveChartComponent={<CurrencyHistoryChart
                isAreaType={true}
            />}
            quickTradeComponent={''}
            orderHistoryComponent={''}
        />
    );
};

export default CryptoExchange;
