import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'react-bootstrap-icons';
import { coinName } from '../utilities/appConstants'
import { getApiEndpoints, roundDecimalPlaces } from '../utilities/commonUtility';

const Header = ({ coinInfo }) => {
    const { name, symbol, diff, percentage } = coinInfo,
        [coinPrice, setCoinPrice] = useState(0);

    useEffect(() => {
        const pricesWs = new WebSocket(getApiEndpoints('assetPrice', { coinName }));
        pricesWs.onmessage = function (msg) {
            setCoinPrice(JSON.parse(msg.data)[coinName])
        }

        return () => {
            pricesWs.close()
        }
    }, [])

    return (
        <header>
            <div className="h6">
                {symbol}
            </div>
            <div className="h3">
                {name}
            </div>
            <div className="h3">
                ${roundDecimalPlaces(coinPrice, 2)}
            </div>
            <div className="h6">
                {
                    diff >= 0 ?
                        <ArrowUpRight className="text-success" size={16} /> :
                        <ArrowDownRight className="text-danger" size={16} />
                }
                <span className={`d-inline-block mx-2 ${diff < 0 ? "text-danger" : "text-success"}`}>
                    {`$${Math.abs(roundDecimalPlaces(diff, 2))} (${roundDecimalPlaces(percentage, 2)}%)`}
                </span>
                <span className="d-inline-block">Today</span>
            </div>
        </header>
    )
}

export default Header;