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
        labels: { rotation: -45, step: 4 }
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

export const getGraphOptions = (resp) => {
    const graphData = resp?.data?.data;

    if (graphData) {
        graphOptions.xAxis.categories = getGraphPeriods(graphData, 'period')
        graphOptions.series = [{
            showInLegend: false,
            data: getGraphDataPoints(graphData, 'high')
        }]
        graphOptions.plotOptions = {
            series: {
                color: getGraphColor(graphData, 'high')
            }
        }
        return graphOptions
    } else {
        return {}
    }
}