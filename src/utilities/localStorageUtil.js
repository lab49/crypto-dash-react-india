export const getDataFromLocalStorage = (key) => {
    try {
        if (typeof localStorage !== 'undefined') {
            const data = localStorage.getItem(key)
            return JSON.parse(data)
        } else {
            return null;
        }
    } catch (error) {
        console.error(error)
    }
}

export const setDataToLocalStorage = (key, value) => {
    try {
        const dataString = JSON.stringify(value)
        localStorage.setItem(key, dataString)
    } catch (error) {
        console.error(error)
    }
}