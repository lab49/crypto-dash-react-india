import moment from 'moment'

export function getCurrentTimestamp() {
    return moment().valueOf()
}

export function getTimestampFromDuration(operation, value, unit) {
    if (operation === 'add') {
        return moment().add(value, unit).valueOf()
    } else if (operation === 'sub') {
        return moment().subtract(value, unit).valueOf()
    } else {
        return moment().valueOf()
    }
}

export function getFormatedDate(time, format) {
    return moment(time).format(format)
}