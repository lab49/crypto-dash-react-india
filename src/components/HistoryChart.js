import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { currencyName, graphRanges } from '../constants/appConstants'
import { getCryptoPriceGraphData } from '../services/currencyService'

const HistoryChart = () => {
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({});

    useEffect(() => {
        const { value, unit } = graphRanges[activeRange]

        getCryptoPriceGraphData(currencyName, unit, value)
            .then(graphOptions => {
                setOptions(graphOptions)
            })

    }, [activeRange])

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <div className="d-flex justify-content-around">
                {
                    graphRanges.map(({ label }, index) => (
                        <button
                            key={label}
                            className={`btn btn-outline-primary ${index === activeRange ? "active" : ""}`}
                            onClick={() => setActiveRange(index)}
                        >
                            {label}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default HistoryChart;