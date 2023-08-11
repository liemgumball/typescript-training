import { URL } from "../constants/constants"

export const generateId = (): string => {
    const timestamp = Date.now().toString(16)
    const randomNumber = Math.floor(Math.random() * 10000).toString(16)
    return `${timestamp}-${randomNumber}`
}

export const formatDateTime = (time: Date): string => {
    return time.toLocaleString()
}

export const getImgUrl = (link: string): string => {
    return URL.SONG_IMG.replace('videoId', getVideoId(link)) //get the video id
}

export const getVideoId = (link: string): string => link.slice(17)