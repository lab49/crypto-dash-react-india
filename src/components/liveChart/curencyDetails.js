import React, {useEffect, useState} from 'react';
import {ChevronDoubleDown, ChevronDoubleUp} from 'react-bootstrap-icons';
import {Flash} from '@lab49/react-value-flash';
import {apiNames} from '../../constants/endpointConstants';
import {closeWebSocket, initializeWebSocket} from '../../services/webSocketService';
import {getCryptoCurrencyPrice} from '../../utilities/currencyDataUtility';
import {getApiEndpoints, roundDecimalPlaces} from '../../utilities/commonUtility';
import {currencyList} from '../../constants/currency';
import CurrencyDropdown from "../common/currencyDropdown";

const CurrencyDetails = ({currencyName, setCurrencyName, cryptoCurrencyInfo}) => {
    const {symbol, diff, percentage, priceUsd} = cryptoCurrencyInfo;
    const [cryptoCurrencyPrice, setCryptoCurrencyPrice] = useState(priceUsd);

    useEffect(() => {
        const priceInfoEndpoint = getApiEndpoints(apiNames.PRICE_DETAILS, {currencyName});
        const pricesWs = initializeWebSocket(priceInfoEndpoint);

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
        <div className="currency-selector-value-wrapper">
            <div className="currency-picker">
                <CurrencyDropdown
                    value={currencyName}
                    onChangeHandler={setCurrencyName}
                    optionList={currencyList}
                    keyPrefix='quick-trade'
                />
            </div>
            <div className="currency-value">
                <div>
                    <Flash
                        stylePrefix="flash-value"
                        formatter="currency"
                        value={roundDecimalPlaces(cryptoCurrencyPrice, 4)}
                    />

                    <div className="currency-change">
                        {
                            diff >= 0 ?
                                <ChevronDoubleUp className="positive-value" size={16}/> :
                                <ChevronDoubleDown className="negative-value" size={16}/>
                        }
                        <span className={`d-inline-block mx-2 ${diff < 0 ? "negative-value" : "positive-value"}`}>
                    {`$${Math.abs(roundDecimalPlaces(diff, 2))} (${roundDecimalPlaces(percentage, 2)}%)`}
                </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrencyDetails;