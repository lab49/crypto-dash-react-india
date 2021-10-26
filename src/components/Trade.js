import { useState } from 'react'
import CurrencyStats from './CurrencyStats'
import CurrencyBuySell from './CurrencyBuySell'

const Trade = ({ name, volume, price = 0, updateTradeHistory }) => {
    const [showVolumne, setShowVolume] = useState(true);

    return (
        <div>
            {
                showVolumne ? (
                    <CurrencyStats
                        volume={volume}
                        setShowVolume={setShowVolume}
                    />
                ) : (
                    <CurrencyBuySell
                        name={name}
                        price={price}
                        setShowVolume={setShowVolume}
                        updateTradeHistory={updateTradeHistory}
                    />
                )
            }
        </div>
    )
}

export default Trade;