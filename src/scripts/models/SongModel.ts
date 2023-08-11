import { Genre } from './GenreModel'

export interface Song {
    id: string;
    title: string;
    artist: string;
    lastEdited: string;
    genre: Genre
    link: string
}

class SongModel {
    public id: string;
    public title: string;
    public artist: string;
    public lastEdited: Date;
    public genre: Genre
    public link: string

    constructor(song: Song) {
        this.id = song.id
        this.title = song.title
        this.artist = song.artist
        this.lastEdited = new Date(song.lastEdited)
        this.genre = song.genre
        this.link = song.link
    }
}

export default SongModel