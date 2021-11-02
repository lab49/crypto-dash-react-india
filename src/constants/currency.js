export const currencyList = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Binance Coin', value: 'binance-coin' },
    { label: 'Cardano', value: 'cardano' },
    { label: 'Dogecoin', value: 'dogecoin' },
    { label: 'Ripple', value: 'xrp' },
    { label: 'Litecoin', value: 'litecoin' },
    { label: 'Stellar', value: 'stellar' },
    { label: 'Monero', value: 'monero' },
    { label: 'Dash', value: 'dash' },
    { label: 'Bitcoin Diamond', value: 'bitcoin-diamond' },
];

export const currencyImagePaths = {
    'Bitcoin': '/BTC.svg',
    'Ethereum': '/Ethereum Classic (ETH).svg',
    'Binance Coin': '/Binance Coin (BNB).svg',
    'Cardano': '/Cardano.svg',
    'Dogecoin': '/Dogecoin (DOGE).svg',
    'XRP': '/Ripple.svg',
    'Litecoin': '/Lite.svg',
    'Stellar': '/Stellar.svg',
    'Monero': '/Monero.svg',
    'Dash': '/Dash.svg',
    'Bitcoin Diamond': '/Bitcoin Diamond (BCD).svg'
}

export const getDefaultCurrencyValue = () => {
    if (Array.isArray(currencyList) && currencyList.length) {
        return currencyList[0].value;
    } else {
        return "";
    }
}