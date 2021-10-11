import axios from 'axios';

axios.defaults.baseURL = "https://api.coincap.io/v2"

export async function getApiData(endPoint, params = {}) {
    try {
        return await axios.get(endPoint, { params });
    } catch (error) {
        console.error({ error })
    }
}