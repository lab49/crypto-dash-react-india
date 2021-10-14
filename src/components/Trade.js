import { useState } from 'react'
import { roundDecimalPlaces } from '../utilities/commonUtility';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utilities/localStorageUtil';

const Trade = ({ coinName, volume, price = 0 }) => {
    const [showVolumne, setShowVolume] = useState(true),
        [coinVolumne, setCoinVolume] = useState("");
    let coinPrice = (coinVolumne * price).toFixed(2);

    function changeCoinVolume(event) {
        const { value } = event.target;

        setCoinVolume(value);
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
                                value={coinVolumne}
                                onChange={changeCoinVolume}
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