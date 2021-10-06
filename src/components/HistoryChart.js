import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { graphData } from '../utilities/sampleJson'

export default function HistoryChart({ data }) {
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({}),
        graphRanges = ["1D", "1W", "1M", "3M", "1Y", "5Y", "Max"],
        dates = graphData.map(data => new Date(data.period).toDateString()),
        points = graphData.map(data => parseFloat(data.high));

    useEffect(() => {
        setOptions({
            title: { text: '' },
            tooltip: {
                formatter() {
                    return `
                    <strong>${this.y}</strong>
                    <br />
                    ${this.x}
                    `
                }
            },
            credits: { enabled: false },
            chart: {
                height: 350,
                type: 'line'
            },
            xAxis: {
                categories: dates,
                labels: {
                    rotation: -45,
                    step: 4
                }
            },
            series: [{
                showInLegend: false,
                data: points
            }]
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