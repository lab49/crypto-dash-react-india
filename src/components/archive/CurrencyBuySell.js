import React, { useState } from 'react'
import Input from './common/formComponents/Input'
import Button from './common/formComponents/Button'
import { roundDecimalPlaces } from '../utilities/commonUtility'
import { getCurrentTimestamp } from '../utilities/dateTimeUtil'
import { ORDER_TYPE, ORDER_STATUS_MAPPING } from "../constants/appConstants"

const CurrencyBuySell = ({ name, price, updateTradeHistory, setShowVolume, availableQty }) => {
    const [cryptoCurrencyVolume, setCryptoCurrencyVolume] = useState(0);
    let cryptoCurrencyPrice = roundDecimalPlaces((cryptoCurrencyVolume * price), 2);

    const buySellCryptoCurrency = (buyOrSell) => {
        if (!cryptoCurrencyVolume) return;
        const tradeData = {
            timestamp: getCurrentTimestamp(),
            currency: name,
            volume: cryptoCurrencyVolume,
            price: cryptoCurrencyPrice,
            orderType: buyOrSell,
            status: ORDER_STATUS_MAPPING.IN_PROGRESS,
        }
        updateTradeHistory(tradeData)
        setShowVolume(true)
        setCryptoCurrencyVolume(0)
    }

    return (
        <div className="row py-2">
            <div className="input-group">
                <Input
                    type="number"
                    className="bg-transparent text-white"
                    placeholder="Currency Volume"
                    value={cryptoCurrencyVolume}
                    onChangeHandler={(event) => setCryptoCurrencyVolume(parseInt(event.target.value))}
                />
                <Input
                    type="text"
                    className="bg-secondary text-white"
                    placeholder="Value"
                    disabled={true}
                    value={`$ ${cryptoCurrencyPrice}`}
                />
            </div>
            <div className="d-flex justify-content-between mt-2">
                <div>
                    Avl Qty : {availableQty ? availableQty : 0}
                </div>
                <div>
                    <Button
                        className="btn-secondary btn-lg me-2"
                        onClickHandler={() => buySellCryptoCurrency(ORDER_TYPE.BUY)}
                    >
                        Buy
                    </Button>
                    <Button
                        className="btn-secondary btn-lg me-2"
                        onClickHandler={() => buySellCryptoCurrency(ORDER_TYPE.SELL)}
                        disabled={cryptoCurrencyVolume > availableQty}
                    >
                        Sell
                    </Button>
                    <Button
                        className="btn-outline-light btn-lg"
                        onClickHandler={() => setShowVolume(true)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CurrencyBuySell