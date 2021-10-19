import axios from 'axios';
import config from '../../config';

axios.defaults.baseURL = config.COINCAP_URL

export async function getApiData(endPoint, params = {}) {
    try {
        return await axios.get(endPoint, { params });
    } catch (error) {
        console.error({ error })
    }
}