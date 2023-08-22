import { REGEX, TEMPLATE } from '../constants/constants'

/**
 * generate random ID
 * @returns random ID string
 */
export const generateId = (): string => {
  const timestamp: string = Date.now().toString(16)
  const randomNumber: string = Math.floor(Math.random() * 10000).toString(16)
  return `${timestamp}-${randomNumber}`
}

/**
 * get the imgURL of the song
 * @param link link of the song
 * @returns link of the song banner
 */
export const getImgUrl = (link: string): string => {
  return TEMPLATE.SONG_IMG_URL_TEMPLATE.replace('videoId', getVideoId(link)) //get the video id
}

/**
 * get the video id
 * @param link link of the video
 * @returns string id of the video
 */
export const getVideoId = (link: string): string => link.slice(17)

/**
 * check if the url is valid or not
 * @param url url of the song
 * @returns is valid or not
 */
export const validateSongUrl = (url: string): boolean => {
  return REGEX.SONG_LINK_URLPATTERN.test(url)
}
