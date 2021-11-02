export const currencyList = [
    { label: 'Bitcoin', value: 'bitcoin', symbol: 'BTC' },
    { label: 'Ethereum', value: 'ethereum', symbol: 'ETH' },
    { label: 'Binance Coin', value: 'binance-coin', symbol: 'BC' },
    { label: 'Cardano', value: 'cardano', symbol: 'ADA' },
    { label: 'Dogecoin', value: 'dogecoin', symbol: 'DOGE' },
    { label: 'Litecoin', value: 'litecoin', symbol: 'LTC' },
    { label: 'Stellar', value: 'stellar', symbol: 'XLM' },
    { label: 'Monero', value: 'monero', symbol: 'XMR' },
    { label: 'Dash', value: 'dash', symbol: 'DASH' },
    { label: 'Bitcoin Diamond', value: 'bitcoin-diamond', symbol: 'BCD' },
    { label: 'XRP', value: 'xrp', symbol: 'XRP' },
];

export const currencyImagePaths = {
    'bitcoin': '/BTC.svg',
    'ethereum': '/Ethereum Classic (ETH).svg',
    'binance-coin': '/Binance Coin (BNB).svg',
    'cardano': '/Cardano.svg',
    'dogecoin': '/Dogecoin (DOGE).svg',
    'xrp': '/Ripple.svg',
    'litecoin': '/Lite.svg',
    'stellar': '/Stellar.svg',
    'monero': '/Monero.svg',
    'dash': '/Dash.svg',
    'bitcoin-diamond': '/Bitcoin Diamond (BCD).svg'
}

export const getDefaultCurrencyValue = () => {
    if (Array.isArray(currencyList) && currencyList.length) {
        return currencyList[0].value;
    } else {
        return "";
    }
}