import { dayUnits } from '../constants/appConstants'
import { getFormatedDate } from './dateTimeUtil'

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
    chart: {
        backgroundColor: '#343a40',
        height: 350,
        type: 'line'
    },
    xAxis: {
        labels: {
            rotation: -45,
            style: { color: 'white' }
        }
    },
    yAxis: {
        title: { text: null },
        labels: {
            style: { color: 'white' }
        }
    }
}

const getGraphPeriods = (graphData, key, unit) => {

    let format = '';

    switch (unit) {
        case dayUnits.DAYS:
            format = 'Do h:mm a';
            break;
        case dayUnits.WEEKS:
            format = 'Do';
            break;
        case dayUnits.MONTHS:
            format = 'MMM-DD';
            break;
        case dayUnits.YEARS:
            format = 'MMM-YYYY';
            break;
        default:
            format = 'DD-MM-YYYY';
            break;
    }

    return graphData.map(data => getFormatedDate(data[key], format))
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

export const getGraphOptions = (graphData, unit) => {

    graphOptions.xAxis.categories = getGraphPeriods(graphData, 'time', unit)
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