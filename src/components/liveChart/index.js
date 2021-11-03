import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Button from '../common/button'
import {useEffect, useState} from 'react'
import {graphRanges} from '../../constants/appConstants'
import {getCryptoCurrencyInfo, getCryptoPriceGraphData} from '../../services/currencyService'
import {currencyList, getDefaultCurrencyValue} from "../../constants/currency";
import CurrencyDetails from "./curencyDetails";

const CurrencyHistoryChart = ({isAreaType = false}) => {
    const [currencyName, setCurrencyName] = useState(getDefaultCurrencyValue());
    const [cryptoCurrencyInfo, setCryptoCurrencyInfo] = useState({});
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({
            chart: {
                backgroundColor: 'rgba(0,0,0,0)',
                height: 290,
                type: isAreaType ? 'area' : 'line'
            },
        });

    useEffect(() => {
        getCryptoCurrencyInfo(currencyName)
            .then((info) => {
                setCryptoCurrencyInfo(info)
            });
    }, [currencyName])

    useEffect(() => {
        const {value, unit} = graphRanges[activeRange]

        getCryptoPriceGraphData(currencyName, unit, value)
            .then(graphOptions => {
                setOptions(graphOptions)
            })

    }, [currencyName, activeRange])

    return (
        <div className="live-chart-wrapper">
            <p className="live-chart-heading">LIVE CHART</p>
            <CurrencyDetails
                currencyName={currencyName}
                setCurrencyName={setCurrencyName}
                cryptoCurrencyInfo={cryptoCurrencyInfo}
            />
            <div className="d-flex range-btn-wrapper">
                {
                    graphRanges.map(({label}, index) => (
                        <Button
                            key={label}
                            className={`range-btn ${index === activeRange ? "active" : ""}`}
                            onClickHandler={() => setActiveRange(index)}
                        >
                            {label}
                        </Button>
                    ))
                }
            </div>
            <div className="chart-container">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    )
}

export default CurrencyHistoryChart;