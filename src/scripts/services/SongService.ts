import ServiceBase from './ServiceBase'
import { ISong } from '../models/SongModel'

class SongService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/songs?_expand=genre`

    constructor() {
        super()
    }

    getList = (): Promise<ISong[]> => this.get(this._path)

    addSong = (data: ISong): Promise<ISong> => this.post(this._path, data)

    updateSong = (data: ISong): Promise<ISong> => this.patch(this._path, data)
}

export default SongService
