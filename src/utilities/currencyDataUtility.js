export const getCryptoCurrencyPrice = (resp, currencyName) => {
    const cryptoCurrencyPrices = JSON.parse(resp.data);
    return cryptoCurrencyPrices[currencyName];
}

export const formatCryptoCurrencyInfo = (asset) => ({
    name: asset.name,
    symbol: asset.symbol,
    priceUsd: asset.priceUsd,
    diff: asset.priceUsd / (1 + asset.changePercent24Hr / 100),
    percentage: asset.changePercent24Hr,
    volume: asset.volumeUsd24Hr / asset.priceUsd
})