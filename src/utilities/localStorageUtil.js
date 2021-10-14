export const getDataFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
}

export const setDataToLocalStorage = (key, value) => {
    try {
        const dataString = JSON.stringify(value)
        localStorage.setItem(key, dataString)
    } catch (error) {
        console.log(error)
    }
}