import { currencyList } from '../constants/currency';

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

    return list.filter(({ id }) => currencyNameList.includes((id)));
}

const getTopCurrencyDetails = ({ name, priceUsd, changePercent24Hr }) => ({
    name,
    priceUsd,
    percentageChange: changePercent24Hr,
    priceChange: Math.abs(getPriceChange(priceUsd, changePercent24Hr)),
})

export const getBiggestWinnerAndLoosers = (currencyList) => {
    let biggestWinner = null;
    let biggestLooser = null;

    if (Array.isArray(currencyList)) {
        const filteredCurrencyList = filterCurrencyList(currencyList);

        filteredCurrencyList.forEach(currency => {
            const percentage = parseFloat(currency.changePercent24Hr);

            if (!biggestLooser || biggestLooser.percentageChange > percentage) {
                biggestLooser = getTopCurrencyDetails(currency);
            } else if (!biggestWinner || biggestWinner.percentageChange < percentage) {
                biggestWinner = getTopCurrencyDetails(currency);
            }
        })
    }

    return { biggestWinner, biggestLooser };
}