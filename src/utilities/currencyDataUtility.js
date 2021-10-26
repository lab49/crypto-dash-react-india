export const getCryptoCurrencyPrice = (resp, currencyName) => {
    const cryptoCurrencyPrices = JSON.parse(resp.data);
    return cryptoCurrencyPrices[currencyName];
}

const getOldPrice = (currentPrice, percentageChange) => {
    return parseFloat(currentPrice) / (1 + parseFloat(percentageChange) / 100)
}

export const formatCryptoCurrencyInfo = ({ name, symbol, priceUsd, changePercent24Hr, volumeUsd24Hr }) => ({
    name,
    symbol,
    priceUsd: parseFloat(priceUsd),
    diff: priceUsd - getOldPrice(priceUsd, changePercent24Hr),
    percentage: parseFloat(changePercent24Hr),
    volume: volumeUsd24Hr / priceUsd
})

export const getBiggestWinnerAndLoosers = (currencyList) => {
    let biggestWinner = null;
    let biggestLooser = null;

    if (Array.isArray(currencyList)) {
        currencyList.forEach(({ name, priceUsd, changePercent24Hr }) => {
            const percentage = parseFloat(changePercent24Hr);

            if (!biggestLooser || biggestLooser.percentage > percentage) {
                biggestLooser = {
                    name,
                    priceUsd,
                    percentage,
                    oldPrice: getOldPrice(priceUsd, percentage)
                };
            } else if (!biggestWinner || biggestWinner.percentage < percentage) {
                biggestWinner = {
                    name,
                    priceUsd,
                    percentage,
                    oldPrice: getOldPrice(priceUsd, percentage)
                };
            }
        })
    }

    return { biggestWinner, biggestLooser };
}