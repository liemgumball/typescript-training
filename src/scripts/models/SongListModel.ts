import { COMMON } from '../constants/constants'
import { parseData } from '../helpers/util'
import SongService from '../services/SongService'
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

    getSongsByGenreId = (genreId: string | null): SongModel[] => {
        if (genreId)
            return this._list.filter(
                (item: SongModel) => item.genre?.id === genreId,
            )
        else return this._list
    }

    saveSong = async (data: ISong): Promise<SongModel> => {
        if (data.id === COMMON.EMPTY) {
            const song = parseData<ISong, SongModel>(
                await this._service.addSong(data),
                SongModel,
            )
            this._list.push(song)
            return song
        } else
            return parseData<ISong, SongModel>(
                await this._service.updateSong(data),
                SongModel,
            )
    }
}

export default SongListModel
