import {useEffect, useState} from 'react';
import {ArrowDownRight, ArrowUpRight} from 'react-bootstrap-icons';
import {currencyName} from '../constants/appConstants'
import {apiNames} from '../constants/endpointConstants';
import {closeWebSocket, initializeWebSocket} from '../services/webSocketService';
import {getCryptoCurrencyPrice} from '../utilities/currencyDataUtility';
import {getApiEndpoints, roundDecimalPlaces} from '../utilities/commonUtility';

const CryptoCurrencyDetails = ({cryptoCurrencyInfo}) => {
    const {name, symbol, diff, percentage} = cryptoCurrencyInfo,
        [cryptoCurrencyPrice, setCryptoCurrencyPrice] = useState(0);

    useEffect(() => {
        const priceInfoEndpoint = getApiEndpoints(apiNames.PRICE_DETAILS, {currencyName}),
            pricesWs = initializeWebSocket(priceInfoEndpoint);

        pricesWs.onmessage = function (msg) {
            const price = getCryptoCurrencyPrice(msg, currencyName)
            setCryptoCurrencyPrice(price);
        }

        return () => {
            closeWebSocket(pricesWs)
        }
    }, [])

    return (
        <div>
            <div>
                {name} <span className="btn btn-dark">{symbol}</span>
            </div>
            <div className="h3">
                ${roundDecimalPlaces(cryptoCurrencyPrice, 2)}
            </div>
            <div className="h6">
                {
                    diff >= 0 ?
                        <ArrowUpRight className="text-success" size={16}/> :
                        <ArrowDownRight className="text-danger" size={16}/>
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