export const graphRanges = [
    { label: '1D', value: 1, unit: 'days' },
    { label: '1W', value: 1, unit: 'weeks' },
    { label: '1M', value: 1, unit: 'months' },
    { label: '3M', value: 3, unit: 'months' },
    { label: '1Y', value: 1, unit: 'years' },
    { label: '5Y', value: 5, unit: 'years' },
    { label: '10Y', value: 10, unit: 'years' },
];

export const dayUnits = {
    YEARS: 'years',
    MONTHS: 'months',
    WEEKS: 'weeks',
    DAYS: 'days',
}

export const LOCAL_STORAGE_KEY = {
    CURRENCY_TRADE_HISTORY: 'currencyTradeHistory',
    USER_ACCOUNT_WALLET: 'userAccountWallet',
}

export const ORDER_TYPE = {
    BUY: 'Buy',
    SELL: 'Sell',
}

export const ORDER_STATUS_MAPPING = {
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    EXPIRED: 'Expired',
}

export const DATE_FORMATS = {
    DDMMYYYYHMMA: 'DD/MM/YYYY h:mm:ss a',
}

export const Constants = {
    MS: 'ms',
    DAY: 'day',
    DAYS: 'days',
}

export const TIME_INTERVAL = {
    ORDER_STATUS_SYNC: 5000,
    BIGGEST_WINNER_LOOSER_SYNC: 60000,
}