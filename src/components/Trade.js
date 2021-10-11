import { useState } from "react"
import { roundDecimalPlaces } from '../utilities/commonUtility';

export default function Trade({ volume, price = 0 }) {
    const [showVolumne, setShowVolume] = useState(true),
        [coinVolumne, setCoinVolume] = useState("");

    function changeCoinVolume(event) {
        const { value } = event.target;

        setCoinVolume(value);
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
                                value={(coinVolumne * price).toFixed(2)}
                            />
                        </div>
                        <div className="col-3">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => setShowVolume(true)}
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