import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Button from './FormComponents/Button'
import { useEffect, useState } from 'react'
import { graphRanges } from '../constants/appConstants'
import { getCryptoPriceGraphData } from '../services/currencyService'

const HistoryChart = ({ currencyName }) => {
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({
            chart: {
                backgroundColor: '#343a40',
                height: 350,
                type: 'line',
            },
        });

    useEffect(() => {
        const { value, unit } = graphRanges[activeRange]

        getCryptoPriceGraphData(currencyName, unit, value)
            .then(graphOptions => {
                setOptions(graphOptions)
            })

    }, [currencyName, activeRange])

    return (
        <div>
            <h3>Live Chart</h3>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <div className="d-flex justify-content-end mt-2">
                {
                    graphRanges.map(({ label }, index) => (
                        <Button
                            key={label}
                            className={`btn btn-graph ${index === activeRange ? "active" : ""}`}
                            onClickHandler={() => setActiveRange(index)}
                        >
                            {label}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default HistoryChart;