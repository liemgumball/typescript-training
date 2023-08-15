import { COMMON } from '../constants/constants'
import { parseData } from '../helpers/util'
import SongService from '../services/SongService'
import GenreModel from './GenreModel'
import SongModel, { ISong } from './SongModel'

class SongListModel {
    private _list: SongModel[]
    private _service: SongService

    constructor() {
        this._service = new SongService()
    }

    get list() {
        return this._list
    }

    init = async (): Promise<void> => {
        const list = await this._service.getList()
        this._list = list.map((item) =>
            parseData<ISong, SongModel>(item, SongModel),
        )
    }

    getSongById = (id: string): SongModel | undefined =>
        this._list.find((item) => item.id === id)

    getSongsByGenreId = (genreId: string | null): SongModel[] => {
        if (genreId)
            return this._list.filter(
                (item: SongModel) => item.genre?.id === genreId,
            )
        else return this._list
    }

    getIndexById(id: string) {
        return this._list.findIndex((item) => item.id === id)
    }

    updateGenre = (genre: GenreModel): void => {
        this._list.forEach((item) => {
            if (item.genre?.id === genre.id) {
                item.genre = genre
            }
        })
    }

    saveSong = async (data: ISong): Promise<SongModel> => {
        if (data.id === COMMON.EMPTY) {
            const song = parseData<ISong, SongModel>(
                await this._service.addSong(data),
                SongModel,
            )
            this._list.push(song)
            return song
        } else {
            const song = parseData<ISong, SongModel>(
                await this._service.updateSong(data),
                SongModel,
            )
            const idx = this._list.findIndex((item) => item.id === song.id)
            this._list[idx] = song
            return song
        }
    }

    deleteSong = async (id: string): Promise<void> => {
        await this._service.deleteSong(id)
        this._list.splice(this.getIndexById(id), 1)
    }

    removeSongByGenreId = (genreId: string): void => {
        const songs = this._list.filter((item) => item.genre?.id === genreId)
        songs.forEach((item) => {
            this._list.splice(this.getIndexById(item.id), 1)
        })
    }
}

export default SongListModel
