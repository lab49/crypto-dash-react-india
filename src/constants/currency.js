export const currencyList = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Binance Coin', value: 'binance-coin' },
    { label: 'Cardano', value: 'cardano' },
    { label: 'Dogecoin', value: 'dogecoin' },
    { label: 'Ripple', value: 'xrp' }
];

export const getDefaultCurrencyValue = () => {
    if(Array.isArray(currencyList) && currencyList.length) {
        return currencyList[0].value;
    } else {
        return "";
    }
}