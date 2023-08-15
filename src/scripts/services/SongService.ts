import ServiceBase from './ServiceBase'
import { ISong } from '../models/SongModel'

class SongService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/songs`

    constructor() {
        super()
    }

    /**
     * get the data of song list from server
     * @returns promise of songs list
     */
    getList = (): Promise<ISong[]> => this.get(this._path + '?_expand=genre')

    /**
     * add a new song to server
     * @param data song to be added
     * @returns promise of song
     */
    addSong = (data: ISong): Promise<ISong> => this.post(this._path, data)

    /**
     * update a song to server
     * @param data song to be updated
     * @returns promise of song
     */
    updateSong = (data: ISong): Promise<ISong> =>
        this.patch(`${this._path}/${data.id}`, data)

    /**
     * delete a song from server
     * @param id id of the song to be deleted
     * @returns promise of deleted
     */
    deleteSong = (id: string): Promise<void> =>
        this.delete(`${this._path}/${id}`)
}

export default SongService
