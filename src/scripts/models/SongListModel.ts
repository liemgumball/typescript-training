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
}

export default SongListModel
