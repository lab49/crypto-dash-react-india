export const graphRanges = ["1D", "1W", "1M", "3M", "1Y", "5Y", "Max"];

export const coinName = "bitcoin"

export const getApiEndpoints = (apiName, params = {}) => {
    switch (apiName) {
        case 'graphData': return 'candles';
        case 'assetInfo': return `assets/${params.coinName}`;
        case 'assetPrice': return `wss://ws.coincap.io/prices?assets=${coinName}`;
        default: return '';
    }
}