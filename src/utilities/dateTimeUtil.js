import moment from 'moment'
import { Constants, DATE_FORMATS } from "../constants/appConstants";

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



export const dateFormatter = (params) => {
    const dateParts = params.data.date.split('/');
    return getFormatedDate(`${dateParts[0]}`, DATE_FORMATS.DDMMYYYYHMMA);
}

export const dateComparator = (date1, date2) => {
    const date1Moment = moment(date1);
    const date2Moment = moment(date2);
    return date1Moment.diff(date2Moment, Constants.MS)
}

export const dateComparatorFilter = (date1, date2) => {
    const date1Moment = moment(date1).startOf(Constants.DAY);
    const date2Moment = moment(date2).startOf(Constants.DAY);
    return date2Moment.diff(date1Moment, Constants.DAYS)

export function getFormatedCurrentDate(format) {
    return moment().format(format)
}