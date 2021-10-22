import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'react-bootstrap-icons';
import { apiNames } from '../constants/endpointConstants';
import { closeWebSocket, initializeWebSocket } from '../services/webSocketService';
import { getCryptoCurrencyPrice } from '../utilities/currencyDataUtility';
import { getApiEndpoints, roundDecimalPlaces } from '../utilities/commonUtility';

const CryptoCurrencyDetails = ({ currencyName, cryptoCurrencyInfo }) => {
    const { name, symbol, diff, percentage, priceUsd } = cryptoCurrencyInfo,
        [cryptoCurrencyPrice, setCryptoCurrencyPrice] = useState(priceUsd);

    useEffect(() => {
        const priceInfoEndpoint = getApiEndpoints(apiNames.PRICE_DETAILS, { currencyName }),
            pricesWs = initializeWebSocket(priceInfoEndpoint);

        pricesWs.onmessage = function (msg) {
            const price = getCryptoCurrencyPrice(msg, currencyName)
            setCryptoCurrencyPrice(price);
        }

        return () => {
            closeWebSocket(pricesWs)
        }
    }, [currencyName])

    useEffect(() => {
        setCryptoCurrencyPrice(priceUsd)
    }, [priceUsd])

    return (
        <div>
            <div>
                {name} <span className="btn btn-secondary">{symbol}</span>
            </div>
            <div className="h3">
                ${roundDecimalPlaces(cryptoCurrencyPrice, 2)}
            </div>
            <div className="h6">
                {
                    diff >= 0 ?
                        <ArrowUpRight className="text-success" size={16} /> :
                        <ArrowDownRight className="text-danger" size={16} />
                }
                <span className={`d-inline-block mx-2 ${diff < 0 ? "text-danger" : "text-success"}`}>
                    {`$${Math.abs(roundDecimalPlaces(diff, 2))} (${roundDecimalPlaces(percentage, 2)}%)`}
                </span>
                <span className="d-inline-block">Today</span>
            </div>
        </div>
    )
}

export default CryptoCurrencyDetails;