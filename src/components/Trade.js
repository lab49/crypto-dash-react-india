import { useState } from 'react'
import { roundDecimalPlaces } from '../utilities/commonUtility';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utilities/localStorageUtil';

const Trade = ({ name, volume, price = 0 }) => {
    const [showVolumne, setShowVolume] = useState(true),
        [cryptoCurrencyVolumne, setCryptoCurrencyVolume] = useState("");
    let coinPrice = (cryptoCurrencyVolumne * price).toFixed(2);

    function changeCurrencyVolume(event) {
        const { value } = event.target;

        setCryptoCurrencyVolume(value);
    }

    function buyCoin() {
        if(!cryptoCurrencyVolumne) return;

        const tradeData = {
            date: new Date().toUTCString(),
            currency: name,
            volume: cryptoCurrencyVolumne,
            price: coinPrice
        }
        let tradeHistory = getDataFromLocalStorage('coinTradeHistory');

        if (Array.isArray(tradeHistory)) {
            tradeHistory.push(tradeData)
        } else {
            tradeHistory = [tradeData]
        }

        setDataToLocalStorage('coinTradeHistory', tradeHistory)
        setShowVolume(true)
    }

    function buyCoin() {
        if(!coinVolumne) return;

        const tradeData = {
            date: new Date().toUTCString(),
            coin: coinName,
            volume: coinVolumne,
            price: coinPrice
        }
        let tradeHistory = getDataFromLocalStorage('coinTradeHistory');

        if (Array.isArray(tradeHistory)) {
            tradeHistory.push(tradeData)
        } else {
            tradeHistory = [tradeData]
        }

        setDataToLocalStorage('coinTradeHistory', tradeHistory)
        setShowVolume(false)
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
                                placeholder="Coins"
                                value={cryptoCurrencyVolumne}
                                onChange={changeCurrencyVolume}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Value"
                                disabled={true}
                                value={`$ ${coinPrice}`}
                            />
                        </div>
                        <div className="col-3">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={buyCoin}
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