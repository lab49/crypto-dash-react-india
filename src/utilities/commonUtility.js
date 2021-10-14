import { apiNames, coinName } from './appConstants'

export function roundDecimalPlaces(value, places) {
    return value ? parseFloat(value).toFixed(places) : 0;
}

export const getApiEndpoints = (apiName, params = {}) => {
    switch (apiName) {
        case apiNames.GRAPHDATA: return 'candles';
        case apiNames.ASSETINFO: return `assets/${params.coinName}`;
        case apiNames.ASSETPRICE: return `wss://ws.coincap.io/prices?assets=${coinName}`;
        default: return '';
    }
}