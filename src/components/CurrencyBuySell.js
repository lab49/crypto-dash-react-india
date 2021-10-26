import React, { useState } from 'react'
import Input from './FormComponents/Input'
import Button from './FormComponents/Button'
import { roundDecimalPlaces } from '../utilities/commonUtility'
import { getFormatedCurrentDate } from '../utilities/dateTimeUtil'

const CurrencyBuySell = ({ name, price, updateTradeHistory, setShowVolume }) => {
    const [cryptoCurrencyVolumne, setCryptoCurrencyVolume] = useState("");
    let cryptoCurrencyPrice = roundDecimalPlaces((cryptoCurrencyVolumne * price), 2);

    function buyCryptoCurrency() {
        if (!cryptoCurrencyVolumne) return;

        const tradeData = {
            date: getFormatedCurrentDate('Do MMM YYYY h:mm A'),
            currency: name,
            volume: cryptoCurrencyVolumne,
            price: cryptoCurrencyPrice
        }

        updateTradeHistory(tradeData)
        setShowVolume(true)
        setCryptoCurrencyVolume("")
    }

    return (
        <div className="row py-2">
            <div className="input-group">
                <Input
                    type="text"
                    className="bg-transparent text-white"
                    placeholder="Currency Volume"
                    value={cryptoCurrencyVolumne}
                    onChangeHandler={(event) => setCryptoCurrencyVolume(event.target.value)}
                />
                <Input
                    type="text"
                    className="bg-secondary text-white"
                    placeholder="Value"
                    disabled={true}
                    value={`$ ${cryptoCurrencyPrice}`}
                />
            </div>
            <div className="d-flex justify-content-end mt-2">
                <Button
                    className="btn-secondary btn-lg me-2"
                    onClickHandler={buyCryptoCurrency}
                >
                    Buy
                </Button>
                <Button
                    className="btn-outline-light btn-lg"
                    onClickHandler={() => setShowVolume(true)}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default CurrencyBuySell