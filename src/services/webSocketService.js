export const initializeWebSocket = (endpoint) => {
    return new WebSocket(endpoint)
}

export const closeWebSocket = (instance) => {
    instance.close()
}