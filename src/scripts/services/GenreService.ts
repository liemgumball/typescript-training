import ServiceBase from './ServiceBase'
import { IGenre } from '../models/GenreModel'

class GenreService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/genres`

    constructor() {
        super()
    }

    /**
     * get the data of genre list from server
     * @returns promise of genres list
     */
    getList = (): Promise<IGenre[]> => this.get(this._path)

    /**
     * add a new genre to server
     * @param data genre to be added
     * @returns promise of genre
     */
    addGenre = (data: IGenre): Promise<IGenre> =>
        this.post<IGenre>(this._path, data)

    /**
     * update a genre to server
     * @param data genre to be updated
     * @returns promise of genre
     */
    updateGenre = (data: IGenre): Promise<IGenre> =>
        this.patch(`${this._path}/${data.id}`, { name: data.name })

    /**
     * delete a genre from server
     * @param id id of the genre to be deleted
     * @returns promise of deleted
     */
    deleteGenre = (id: string): Promise<void> =>
        this.delete(`${this._path}/${id}`)
}

export default GenreService
