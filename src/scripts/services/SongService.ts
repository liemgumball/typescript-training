import ServiceBase from './ServiceBase'
import { ISong } from '../models/SongModel'

class SongService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/songs`

    constructor() {
        super()
    }

    getList = (): Promise<ISong[]> => this.get(this._path + '?_expand=genre')

    addSong = (data: ISong): Promise<ISong> => this.post(this._path, data)

    updateSong = (data: ISong): Promise<ISong> =>
        this.patch(`${this._path}/${data.id}`, data)

    deleteSong = (id: string): Promise<void> =>
        this.delete(`${this._path}/${id}`)
}

export default SongService
