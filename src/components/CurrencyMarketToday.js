import React, { useEffect, useState } from 'react'
import { getTopCurrencyInfo } from '../services/currencyService'
import { roundDecimalPlaces } from '../utilities/commonUtility'

const CurrencyMarketToday = () => {
    const [topCurrencyInfo, setTopCurrencyInfo] = useState({});
    const biggestWinner = topCurrencyInfo.biggestWinner;
    const biggestLooser = topCurrencyInfo.biggestLooser;

    useEffect(() => {
        getTopCurrencyInfo()
            .then((info) => {
                setTopCurrencyInfo(info)
            });
    }, [])

    const getCardRow = ({ name, priceUsd, oldPrice, percentage }) => {
        return (
            <>
                <div className="col">
                    {name}
                </div>
                <div className="col">
                    {roundDecimalPlaces(priceUsd, 2)}
                </div>
                <div className={`col ${percentage >= 0 ? "text-success" : "text-danger"}`}>
                    {`${roundDecimalPlaces(oldPrice, 2)} (${roundDecimalPlaces(percentage, 2)}%)`}
                </div>
            </>
        )
    }

    return (
        <div className="card bg-transparent border-light">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        Max Gainer
                    </div>
                    {
                        biggestWinner ?
                            getCardRow(biggestWinner) :
                            <div className="col">N.A.</div>
                    }
                </div>
                <div className="row">
                    <div className="col">
                        Max Looser
                    </div>
                    {
                        biggestLooser ?
                            getCardRow(biggestLooser) :
                            <div className="col">N.A.</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrencyMarketToday