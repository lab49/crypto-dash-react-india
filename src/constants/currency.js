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
    'Bitcoin': '/BTC.svg',
    'Ethereum': '/Ethereum Classic (ETH).svg',
    'Binance Coin': '/Binance Coin (BNB).svg',
    'Cardano': '/Cardano.svg',
    'Dogecoin': '/Dogecoin (DOGE).svg',
    'Ripple': '/Ripple.svg',
    'Litecoin': '/Lite.svg',
    'Stellar': '/Stellar.svg',
    'Monero': '/Monero.svg',
    'Dash': '/Dash.svg',
    'Bitcoin Diamond': '/Bitcoin Diamond (BCD).svg',
    'XRP': '/Ripple.svg',
}

export const getDefaultCurrencyValue = () => {
    if (Array.isArray(currencyList) && currencyList.length) {
        return currencyList[0].value;
    } else {
        return "";
    }
}