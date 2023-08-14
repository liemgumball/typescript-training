import ServiceBase from './ServiceBase'
import { ISong } from '../models/SongModel'

class SongService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/songs?_expand=genre`

    constructor() {
        super()
    }

    getList = (): Promise<ISong[]> => this.get(this._path)
}

export default SongService
