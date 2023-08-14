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
        this._list = await this.parseData(await this._service.getList())
        console.log('list', this._list)
    }

    parseData = (data: ISong[]): SongModel[] => {
        console.log('parse', data)
        return data.map((item: ISong) => new SongModel(item))
    }

    getSongsByGenreId = (genreId: string | null): SongModel[] => {
        if (genreId)
            return this._list.filter(
                (item: SongModel) => item.genre.id === genreId,
            )
        else return this._list
    }
}

export default SongListModel
