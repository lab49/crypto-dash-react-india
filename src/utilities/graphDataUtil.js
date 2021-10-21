import { dayUnits } from '../constants/appConstants'

let graphOptions = {
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
    chart: { height: 350, type: 'line' },
    xAxis: {
        labels: { rotation: -45 }
    }
}

const getGraphPeriods = (graphData, key) => {
    return graphData.map(data => new Date(data[key]).toDateString())
}

const getGraphDataPoints = (graphData, key) => {
    return graphData.map(data => parseFloat(data[key]))
}

const getGraphColor = (graphData, key) => {
    if (graphData[0][key] <= graphData[graphData.length - 1][key]) {
        return 'green';
    } else {
        return '#ea4335';
    }
}

export const getGraphInterval = (unit) => {
    switch (unit) {
        case dayUnits.DAYS: return 'h1';
        case dayUnits.WEEKS: return 'h6';
        case dayUnits.MONTHS: return 'h12';
        default: return 'd1';
    }
    
}

export const getGraphOptions = (graphData) => {
    
    graphOptions.xAxis.categories = getGraphPeriods(graphData, 'time')
    graphOptions.xAxis.labels.step = Math.ceil(graphData.length / 10);
    graphOptions.series = [{
        showInLegend: false,
        data: getGraphDataPoints(graphData, 'priceUsd')
    }]
    graphOptions.plotOptions = {
        series: {
            color: getGraphColor(graphData, 'priceUsd')
        }
    }

    return { ...graphOptions };
}