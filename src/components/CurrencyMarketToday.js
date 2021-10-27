import React, { useEffect, useState } from 'react'
import { getTopCurrencyInfo } from '../services/currencyService'
import { roundDecimalPlaces } from '../utilities/commonUtility'
import { TIME_INTERVAL } from '../constants/appConstants'

const CurrencyMarketToday = () => {
    const [topCurrencyInfo, setTopCurrencyInfo] = useState({});
    const biggestWinner = topCurrencyInfo.biggestWinner;
    const biggestLooser = topCurrencyInfo.biggestLooser;

    useEffect(() => {
        getTopCurrencyInfo()
            .then((info) => setTopCurrencyInfo(info));

        const topCurrencyInterval = setInterval(() => {
            getTopCurrencyInfo()
                .then((info) => setTopCurrencyInfo(info));
        }, TIME_INTERVAL.BIGGEST_WINNER_LOOSER_SYNC)

        return () => {
            clearInterval(topCurrencyInterval)
        }
    }, [])

    const getCardRow = ({ name, priceUsd, priceChange, percentageChange }) => {
        return (
            <>
                <div className="col">
                    {name}
                </div>
                <div className="col">
                    {`$${roundDecimalPlaces(priceUsd, 2)}`}
                </div>
                <div className={`col ${percentageChange >= 0 ? "text-success" : "text-danger"}`}>
                    {`$${roundDecimalPlaces(priceChange, 2)}
                    (${roundDecimalPlaces(percentageChange, 2)}%)`}
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