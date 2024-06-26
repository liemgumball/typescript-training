import { COMMON, RESOURCE_NAME } from '../constants/constants'
import { parseData } from '../helpers/parse'
import ServiceBase from '../services/serviceBase'
import GenreModel from './genreModel'
import SongModel, { ISong } from './songModel'

class SongListModel {
  private _list: SongModel[]
  private _service: ServiceBase<ISong>

  constructor() {
    this._list = []
    this._service = new ServiceBase<ISong>(
      `${process.env.API_GATEWAY + RESOURCE_NAME.SONGS}`
    )
  }

  get list() {
    return this._list
  }

  /**
   * initialize the list of songs
   */
  init = async (): Promise<void> => {
    const list: ISong[] = (await this._service.get(
      RESOURCE_NAME.GENRE_RELATION
    )) as []
    this._list = list
      .map((item) => parseData<ISong, SongModel>(item, SongModel))
      .sort(
        (a, b) =>
          Number(new Date(b.lastEdited)) - Number(new Date(a.lastEdited))
      )
  }

  /**
   * get the song by its id
   * @param id id of the song
   * @returns the song found or undefined
   */
  getSongById = (id: string): SongModel | undefined =>
    this._list.find((item) => item.id === id)

  /**
   * get the song by its id
   * @param id id of the song
   * @returns song instance
   */
  getIndexById = (id: string): number =>
    this._list.findIndex((item) => item.id === id)

  /**
   * get songs following genre or all songs
   * @param genreId id of the genre
   * @returns list of songs
   */
  getSongsByGenreId = (genreId?: string): SongModel[] => {
    if (genreId) {
      return this._list.filter((item: SongModel) => item.genreId === genreId)
    } else {
      return this._list
    }
  }

  /**
   * update genre of its song
   * @param genre genre to update
   */
  updateGenreForSong = (genre: GenreModel): void => {
    this._list.forEach((item) => {
      if (item.genreId === genre.id) {
        item.genre = genre
      }
    })
  }

  /**
   * save the song to server and list
   * @param data information of song
   * @returns promise of song instance
   */
  saveSong = async (data: ISong): Promise<SongModel> => {
    if (data.id === COMMON.EMPTY) {
      const song: SongModel = parseData<ISong, SongModel>(
        await this._service.post(data),
        SongModel
      )
      this._list.unshift(song)
      return song
    } else {
      const song: SongModel = parseData<ISong, SongModel>(
        await this._service.patch(data.id!, data),
        SongModel
      )
      const idx: number = this._list.findIndex((item) => item.id === song.id)
      this._list.splice(idx, 1)
      this._list.unshift(song)
      return song
    }
  }

  /**
   * remove a song from the server and list
   * @param id id of the song
   */
  deleteSong = async (id: string): Promise<void> => {
    await this._service.delete(id)
    this._list.splice(this.getIndexById(id), 1)
  }

  /**
   * remove songs by its genre
   * @param genreId id of the genre
   */
  removeSongByGenreId = (genreId: string): void => {
    const songs: SongModel[] = this._list.filter(
      (item) => item.genreId === genreId
    )

    songs.forEach((item) => {
      this._list.splice(this.getIndexById(item.id), 1)
    })
  }
}

export default SongListModel
