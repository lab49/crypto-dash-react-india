import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { getApiData } from '../utilities/apiUtility'
import { coinName, graphRanges } from '../utilities/appConstants'
import { getGraphInterval, getGraphOptions } from '../utilities/graphDataUtil'
import { getApiEndpoints } from '../utilities/commonUtility'
import { getCurrentTimestamp, getTimestampFromDuration } from '../utilities/dateTimeUtil'

const HistoryChart = () => {
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({});

    useEffect(() => {
        const { value, unit } = graphRanges[activeRange],
            params = {
                exchange: 'poloniex',
                interval: getGraphInterval(unit),
                baseId: 'ethereum',
                quoteId: coinName,
                start: getTimestampFromDuration('sub', value, unit),
                end: getCurrentTimestamp()
            }
        getApiData(getApiEndpoints('graphData'), params)
            .then(resp => {
                setOptions(getGraphOptions(resp))
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