/**
 * format name if it to long
 * @param name name of data
 * @param length max length of data to format
 * @returns formatted name
 */
export const truncateName = (name: string, length: number): string =>
  name.length < length ? name : name.slice(0, length) + '...'

/**
 * format date
 * @param time time to be formatted
 * @returns formatted time to string
 */
export const formatDateTime = (time: Date): string => time.toLocaleString()
