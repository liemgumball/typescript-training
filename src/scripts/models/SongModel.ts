import { generateId } from '../helpers/util'
import { IGenre } from './GenreModel'

export interface ISong {
    id?: string
    title: string
    artist: string
    lastEdited: string
    genre?: IGenre
    genreId: string
    link: string
}

class SongModel {
    public id: string
    public title: string
    public artist: string
    public lastEdited: Date
    public genre?: IGenre
    public link: string

    constructor(song: ISong) {
        this.id = song.id || generateId()
        this.title = song.title
        this.artist = song.artist
        this.lastEdited = new Date(song.lastEdited)
        this.genre = song.genre
        this.link = song.link
    }
}

export default SongModel
