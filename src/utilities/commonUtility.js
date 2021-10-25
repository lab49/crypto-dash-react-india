import { apiEndpoints } from "../constants/endpointConstants";
import { getFormatedDate } from "./dateTimeUtil";
import moment from "moment";
import { Constants, DATE_FORMATS } from "../constants/appConstants";

export function roundDecimalPlaces(value, places) {
    return value ? parseFloat(value).toFixed(places) : 0;
}

export const getApiEndpoints = (apiName, params = {}) => {
    const endpoint = apiEndpoints[apiName];
	if(typeof endpoint === 'function') {
		return endpoint(params)
	} else {
		return endpoint
	}
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
}