export const nameDisplay = (name: string, length: number): string =>
  name.length < length ? name : name.slice(0, length) + '...'

/**
 * format date
 * @param time time to be formatted
 * @returns formatted time to string
 */
export const formatDateTime = (time: Date): string => {
  return time.toLocaleString()
}
