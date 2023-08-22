/**
 * wait few milliseconds
 * @param time time to wait
 * @returns promise after waiting
 */
export const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
}
