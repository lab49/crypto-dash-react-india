import { apiEndpoints } from "../constants/endpointConstants";

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