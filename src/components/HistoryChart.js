import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { getApiData } from '../utilities/apiUtility'
import { coinName, getApiEndpoints, graphRanges } from '../utilities/appConstants'
import { getGraphOptions } from '../utilities/graphDataUtil'

export default function HistoryChart() {
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({});

    useEffect(() => {
        const params = {
            exchange: 'poloniex',
            interval: 'h8',
            baseId: 'ethereum',
            quoteId: coinName,
            start: 1530720000000,
            end: 1531670400000
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
                    graphRanges.map((range, index) => (
                        <button
                            key={range}
                            className={`btn btn-outline-primary ${index === activeRange ? "active" : ""}`}
                            onClick={() => setActiveRange(index)}
                        >
                            {range}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}