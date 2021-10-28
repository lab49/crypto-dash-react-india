import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDoubleUp, ChevronDoubleDown } from 'react-bootstrap-icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { currencyImagePaths } from '../../constants/currency';
import { roundDecimalPlaces } from '../../utilities/commonUtility';
import { dayUnits } from '../../constants/appConstants';
import { getCryptoPriceGraphData } from '../../services/currencyService';
import { modifyOptionsForCard } from '../../utilities/graphDataUtil';

const CryptoCurrencyCard = ({ id, name, symbol, percentageChange }) => {
    const percentage = roundDecimalPlaces(percentageChange, 2);
    const [cardOptions, setCardOptions] = useState({
        chart: {
            backgroundColor: '#343a40',
            height: 50,
            type: 'line',
        },
    });

    useEffect(() => {
        getCryptoPriceGraphData(id, dayUnits.DAYS, 1)
            .then(options => {
                const modifiedOptions = modifyOptionsForCard(options)
                setCardOptions(modifiedOptions)
            })

    }, [id])

    return (
        <div className="winner-looser-card-body">
            <div className="row">
                <div className="col-2 d-flex align-items-center">
                    <Image src={currencyImagePaths[name] || "abc"} width="40" height="40" alt={name} />
                </div>
                <div className="col">
                    <div>
                        <span className="name">{name}</span>
                        <span className="symbol"> {symbol}</span>
                    </div>
                    {
                        percentage >= 0 ? (
                            <div className="positive-value">
                                <ChevronDoubleUp/>
                                <span className="ms-1">{`${percentage} %`}</span>
                            </div>
                        ) : (
                            <div className="negative-value">
                                <ChevronDoubleDown/>
                                <span className="ms-1">{`${Math.abs(percentage)} %`}</span>
                                {/*<span className="float-right">{`$${roundDecimalPlaces(priceChange, 2)}`}</span>*/}
                            </div>
                        )
                    }
                </div>
                <div className="col">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={cardOptions}
                    />
                </div>
            </div>
        </div>
    )
}

export default CryptoCurrencyCard