import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'react-bootstrap-icons';
import { Flash } from '@lab49/react-value-flash';
import Dropdown from "./FormComponents/Dropdown";
import { apiNames } from '../constants/endpointConstants';
import { closeWebSocket, initializeWebSocket } from '../services/webSocketService';
import { getCryptoCurrencyPrice } from '../utilities/currencyDataUtility';
import { getApiEndpoints, roundDecimalPlaces } from '../utilities/commonUtility';
import { currencyList } from '../constants/currency';

const CryptoCurrencyDetails = ({ currencyName, setCurrencyName, cryptoCurrencyInfo }) => {
    const { symbol, diff, percentage, priceUsd } = cryptoCurrencyInfo,
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
        <div className="row">
            <div className="d-flex mb-3 align-items-center">
                <Dropdown
                    className="form-select-lg w-50 bg-secondary text-white"
                    value={currencyName}
                    onChangeHandler={setCurrencyName}
                    optionList={currencyList}
                />
                <div className="bg-secondary ms-2 p-2 rounded h-fit-content">
                    {symbol}
                </div>
            </div>
            <div className="h3">
                <Flash
                    stylePrefix="p-1 w-fit-content"
                    formatter="currency"
                    value={roundDecimalPlaces(cryptoCurrencyPrice, 4)}
                />
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