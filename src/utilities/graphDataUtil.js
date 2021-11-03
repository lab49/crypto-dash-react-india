import {dayUnits} from '../constants/appConstants'
import {getFormattedDate} from './dateTimeUtil'

const successGreen = '#14CC9E';
const failedRed = '#ea4335';
const plotGray = '#999999';

let graphOptions = {
    title: {text: ''},
    tooltip: {
        crosshairs: {
            color: successGreen,
            dashStyle: 'solid',
            width: 2
        }
    },
    credits: {enabled: false},
    chart: {
        backgroundColor: 'rgba(0,0,0,0)',
        height: 290
    },

    xAxis: {
        labels: {
            style: {color: plotGray},
        },
        lineColor: plotGray,
        lineWidth: 1
    },
    yAxis: {
        title: {text: null},
        labels: {
            style: {color: plotGray},
        },
        gridLineColor: plotGray,
        lineColor: plotGray,
        lineWidth: 1
    }
}

const getGraphDateFormat = (unit) => {
    switch (unit) {
        case dayUnits.DAYS:
            return 'Do h:mm a';
        case dayUnits.WEEKS:
            return 'Do';
        case dayUnits.MONTHS:
            return 'MMM-DD';
        case dayUnits.YEARS:
            return 'MMM-YYYY';
        default:
            return 'DD-MM-YYYY';
    }
}

const getGraphPeriods = (graphData, key, unit) => {
    const format = getGraphDateFormat(unit);
    return graphData.map(data => getFormattedDate(data[key], format))
}

const getGraphDataPoints = (graphData, key) => {
    return graphData.map(data => parseFloat(data[key]))
}

const getGraphColor = (graphData, key) => {
    if (parseFloat(graphData[0][key]) <= parseFloat(graphData[graphData.length - 1][key])) {
        return '#14CC9E';
    } else {
        return '#ea4335';
    }
}

export const getGraphInterval = (unit) => {
    switch (unit) {
        case dayUnits.DAYS:
            return 'h1';
        case dayUnits.WEEKS:
            return 'h6';
        case dayUnits.MONTHS:
            return 'h12';
        default:
            return 'd1';
    }
}

export const getGraphOptions = (graphData, unit) => {
    const color = getGraphColor(graphData, 'priceUsd');
    let modifiedOptions = JSON.parse(JSON.stringify(graphOptions))
    modifiedOptions.xAxis.categories = getGraphPeriods(graphData, 'time', unit)
    modifiedOptions.xAxis.labels.step = Math.ceil(graphData.length / 10);
    modifiedOptions.series = [{
        showInLegend: false,
        data: getGraphDataPoints(graphData, 'priceUsd'),
    }]
    modifiedOptions.tooltip.crosshairs.color = color;
    modifiedOptions.tooltip.useHTML = true;
    modifiedOptions.tooltip.headerFormat = '<div style="background: black;  text-align: center">';
    modifiedOptions.tooltip.pointFormat = '<strong style="color: white">${point.key}</strong><p>${point.y}</p>';
    modifiedOptions.tooltip.footerFormat = '</div>';
    modifiedOptions.plotOptions = {
        series: {
            color,
            fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, color + '40'],
                    [1, color + '00']
                ]
            },
            marker: {
                enabled: false
            }
        },

    }

    return modifiedOptions;
}

export const modifyOptionsForCard = (options) => {
    let modifiedOptions = JSON.parse(JSON.stringify(options))
    if (Object.keys(modifiedOptions).length) {
        modifiedOptions.chart.backgroundColor = 'transparent';
        modifiedOptions.chart.height = 40;
        modifiedOptions.xAxis.lineWidth = 0;
        modifiedOptions.xAxis.labels.enabled = false;
        modifiedOptions.yAxis.gridLineWidth = 0;
        modifiedOptions.yAxis.lineWidth = 0;
        modifiedOptions.yAxis.labels.enabled = false;
        modifiedOptions.tooltip.enabled = false;
        modifiedOptions.plotOptions.series.color;
    }

    return modifiedOptions;
}