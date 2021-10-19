import { useState } from 'react'
import { roundDecimalPlaces } from '../utilities/commonUtility';

const Trade = ({ name, volume, price = 0, updateTradeHistory }) => {
    const [showVolumne, setShowVolume] = useState(true),
        [cryptoCurrencyVolumne, setCryptoCurrencyVolume] = useState("");
    let cryptoCurrencyPrice = (cryptoCurrencyVolumne * price).toFixed(2);

    function changeCurrencyVolume(event) {
        const { value } = event.target;

        setCryptoCurrencyVolume(value);
    }

    function buyCryptoCurrency() {
        if(!cryptoCurrencyVolumne) return;

        const tradeData = {
            date: new Date().toUTCString(),
            currency: name,
            volume: cryptoCurrencyVolumne,
            price: cryptoCurrencyPrice
        }

        updateTradeHistory(tradeData)
        setShowVolume(true)
        setCryptoCurrencyVolume("")
    }

    return (
        <div>
            <span className="h3">Stats</span>
            {
                showVolumne ? (
                    <div className="row py-2">
                        <div className="col">
                            <div>Today's Volume</div>
                            <div>
                                <strong>
                                    {roundDecimalPlaces(volume, 4)}
                                </strong>
                            </div>
                        </div>
                        <div className="col-3">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => setShowVolume(false)}
                            >
                                Trade
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row py-2">
                        <div className="input-group col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Currency Volume"
                                value={cryptoCurrencyVolumne}
                                onChange={changeCurrencyVolume}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Value"
                                disabled={true}
                                value={`$ ${cryptoCurrencyPrice}`}
                            />
                        </div>
                        <div className="col-3">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={buyCryptoCurrency}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Trade;