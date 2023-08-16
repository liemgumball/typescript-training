import { REGEX, URL } from '../constants/constants'

/**
 * generate random ID
 * @returns random ID string
 */
export const generateId = (): string => {
    const timestamp = Date.now().toString(16)
    const randomNumber = Math.floor(Math.random() * 10000).toString(16)
    return `${timestamp}-${randomNumber}`
}

/**
 * format date
 * @param time time to be formatted
 * @returns formatted time to string
 */
export const formatDateTime = (time: Date): string => {
    return time.toLocaleString()
}

/**
 * get the imgURL of the song
 * @param link link of the song
 * @returns link of the song banner
 */
export const getImgUrl = (link: string): string => {
    return URL.SONG_IMG_TEMPLATE.replace('videoId', getVideoId(link)) //get the video id
}

/**
 * get the video id
 * @param link link of the video
 * @returns string id of the video
 */
export const getVideoId = (link: string): string => link.slice(17)

/**
 * parse data from interface to model
 * @param data interface of data
 * @param constructor constructor of the model parsed into
 * @returns new model instance
 */
export function parseData<IT, T>(
    data: IT,
    constructor: new (data: IT) => T,
): T {
    return new constructor(data)
}

/**
 * check if the url is valid or not
 * @param url url of the song
 * @returns is valid or not
 */
export const validateSongUrl = (url: string): boolean => {
    return REGEX.SONG_LINK_URLPATTERN.test(url)
}

export const wait = (time: number): Promise<void> =>
    new Promise<void>((resolve) => {
        setTimeout(() => resolve(), time)
    })
