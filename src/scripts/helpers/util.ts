export const generateId = (): string => {
    const timestamp = Date.now().toString(16)
    const randomNumber = Math.floor(Math.random() * 10000).toString(16)
    return `${timestamp}-${randomNumber}`
}

export const formatDateTime = (time: Date) => {
    return time.toLocaleString()
}