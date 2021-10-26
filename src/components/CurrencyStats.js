import React from 'react'
import Button from './FormComponents/Button'
import { roundDecimalPlaces } from '../utilities/commonUtility'

const CurrencyStats = ({ volume, setShowVolume }) => {
    return (
        <div className="row">
            <div className="col">
                <span className="h3">Stats</span>
                <div>Today's Quantity</div>
                <div>
                    <strong>
                        {roundDecimalPlaces(volume, 4)}
                    </strong>
                </div>
            </div>
            <div className="col align-self-center">
                <Button
                    className="btn-secondary btn-lg"
                    onClickHandler={() => setShowVolume(false)}
                >
                    Trade
                </Button>
            </div>
        </div>
    )
}

export default CurrencyStats