import { apiNames } from '../constants/endpointConstants'
import { getApiEndpoints } from '../utilities/commonUtility'
import { getApiData } from '../utilities/apiUtility'
import { formatCryptoCurrencyInfo, getBiggestWinnerAndLoosers } from '../utilities/currencyDataUtility'
import { getGraphInterval, getGraphOptions } from '../utilities/graphDataUtil'
import { getCurrentTimestamp, getTimestampFromDuration } from '../utilities/dateTimeUtil'

export const getTopCurrencyInfo = async () => {
    const allCurrencyInfoEndpoint = getApiEndpoints(apiNames.ALL_CURRENCY_INFO)

    const resp = await getApiData(allCurrencyInfoEndpoint),
        currencyList = resp?.data?.data

    return getBiggestWinnerAndLoosers(currencyList)
}

export const getCryptoCurrencyInfo = async (currencyName) => {
    const currencyInfoEndpoint = getApiEndpoints(apiNames.CURRENCY_INFO, { currencyName })

    const resp = await getApiData(currencyInfoEndpoint),
        currency = resp?.data?.data

    return currency ? formatCryptoCurrencyInfo(currency) : {}
}

export const getCryptoPriceGraphData = async (currencyName, unit, value) => {
    const priceHistoryEndpoint = getApiEndpoints(apiNames.CURRENCY_PRICE_HISTORY, { currencyName }),
        params = {
            interval: getGraphInterval(unit),
            start: getTimestampFromDuration('sub', value, unit),
            end: getCurrentTimestamp()
        }

    const resp = await getApiData(priceHistoryEndpoint, params),
        graphData = resp?.data?.data;

    return Array.isArray(graphData) && graphData.length ? getGraphOptions(graphData, unit) : {}
}