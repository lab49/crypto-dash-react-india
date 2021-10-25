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
