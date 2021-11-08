import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '../../config';

axiosRetry(axios, { retries: 3 });

axios.defaults.baseURL = config.COINCAP_URL

export async function getApiData(endPoint, params = {}) {
    try {
        return await axios.get(endPoint, { params });
    } catch (error) {
        console.error({ error })
    }
}