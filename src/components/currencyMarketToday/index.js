import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CryptoCurrencyCard from './CryptoCurrencyCard';
import { getTopCurrencyInfo } from '../../services/currencyService'
import { TIME_INTERVAL } from '../../constants/appConstants'

const CurrencyMarketToday = () => {
    const [topCurrencyInfo, setTopCurrencyInfo] = useState({});
    const { biggestWinner, biggestLooser } = topCurrencyInfo;

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

    return (
        <div className="winner-looser-card">
            <div className="row">
                <div className="col">
                    <div className="d-flex">
                        <Image src="/trending-up.svg" width={24} height={24} alt="+" />
                        <div className="winner-looser-card-title">Biggest Gainner</div>
                    </div>
                    {
                        Array.isArray(biggestWinner) && biggestWinner.length ?
                            biggestWinner.map(winner => <CryptoCurrencyCard key={winner.name} {...winner} />) :
                            <div className="col">N.A.</div>
                    }
                </div>
                <div className="col">
                    <div className="d-flex">
                        <Image src="/trending-down.svg" width={24} height={24} alt="-" />
                        <div className="winner-looser-card-title">Biggest Looser</div>
                    </div>
                    {
                        Array.isArray(biggestLooser) && biggestLooser.length ?
                            biggestLooser.map(winner => <CryptoCurrencyCard key={winner.name} {...winner} />) :
                            <div className="col">N.A.</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrencyMarketToday;