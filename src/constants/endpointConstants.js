export const apiNames = {
    CURRENCY_PRICE_HISTORY: 'CURRENCY_PRICE_HISTORY',
    CURRENCY_INFO: 'CURRENCY_INFO',
    PRICE_DETAILS: 'PRICE_DETAILS'
}


export const apiEndpoints = {
    [apiNames.CURRENCY_PRICE_HISTORY]: 'candles',
    [apiNames.CURRENCY_INFO]: ({currencyName}) => `assets/${currencyName}`,
    [apiNames.PRICE_DETAILS]: ({currencyName}) => `wss://ws.coincap.io/prices?assets=${currencyName}`
}