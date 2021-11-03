import { currencyList } from '../constants/currency';
import { getDataFromLocalStorage } from './localStorageUtil';
import { LOCAL_STORAGE_KEY } from '../constants/appConstants';
import { roundDecimalPlaces } from './commonUtility';

export const getCryptoCurrencyPrice = (resp, currencyName) => {
    const cryptoCurrencyPrices = JSON.parse(resp.data);
    return cryptoCurrencyPrices[currencyName];
}

const getOldPrice = (currentPrice, percentageChange) => {
    return parseFloat(currentPrice) / (1 + parseFloat(percentageChange) / 100)
}

const getPriceChange = (currentPrice, percentageChange) => {
    return currentPrice - getOldPrice(currentPrice, percentageChange);
}

export const formatCryptoCurrencyInfo = ({ name, symbol, priceUsd, changePercent24Hr, volumeUsd24Hr }) => ({
    name,
    symbol,
    priceUsd: parseFloat(priceUsd),
    diff: getPriceChange(priceUsd, changePercent24Hr),
    percentage: parseFloat(changePercent24Hr),
    volume: volumeUsd24Hr / priceUsd,
})

const filterCurrencyList = (list) => {
    const currencyNameList = currencyList.map(({ value }) => value);
    let filteredList = list
        .filter(item => currencyNameList.includes(item.id))
        .map(item => getTopCurrencyDetails(item));

    return filteredList;
}

const getTopCurrencyDetails = ({ id, name, symbol, priceUsd, changePercent24Hr }) => ({
    id,
    name,
    priceUsd,
    symbol,
    percentageChange: parseFloat(changePercent24Hr),
    priceChange: Math.abs(getPriceChange(priceUsd, changePercent24Hr)),
})

const sortList = (list, key) => {
    return list.sort((currency1, currency2) => currency1[key] - currency2[key])
}

export const getBiggestWinnerAndLoosers = (currencyList) => {
    let biggestWinner = [];
    let biggestLooser = [];

    if (Array.isArray(currencyList)) {
        const filteredCurrencyList = filterCurrencyList(currencyList);
        const sortedList = sortList(filteredCurrencyList, 'percentageChange')

        biggestLooser = sortedList.slice(0, 3)
        biggestWinner = sortedList.slice(-3, sortedList.length).reverse()
    }

    return { biggestWinner, biggestLooser };
}

const getWalletDetails = ({ id, name, symbol, priceUsd }) => {
    const userAccountWallet = getDataFromLocalStorage(LOCAL_STORAGE_KEY.USER_ACCOUNT_WALLET);
    const quantity = userAccountWallet[id] || 0;

    return {
        id,
        name,
        symbol,
        quantity,
        amount: roundDecimalPlaces(priceUsd * quantity, 6),
    }
}

export const filterWalletCurrencyList = (list = []) => {
    const currencyNameList = currencyList.map(({ value }) => value);

    return list
        .filter(item => currencyNameList.includes(item.id))
        .map(item => getWalletDetails(item));
}