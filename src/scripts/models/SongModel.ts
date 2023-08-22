import { generateId } from '../helpers/songHelper'
import { IGenre } from './genreModel'

export interface ISong {
  readonly id?: string
  title: string
  artist: string
  lastEdited: string
  genre?: IGenre
  genreId: string
  link: string
}

class SongModel implements ISong {
  public id: string
  public title: string
  public artist: string
  public lastEdited: string
  public genre?: IGenre
  public genreId: string
  public link: string

  constructor(song: ISong) {
    this.id = song.id || generateId()
    this.title = song.title
    this.artist = song.artist
    this.lastEdited = new Date(song.lastEdited).toISOString()
    this.genre = song.genre
    this.genreId = song.genreId
    this.link = song.link
  }
}

export default SongModel
