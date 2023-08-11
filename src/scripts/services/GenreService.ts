import ServiceBase from './ServiceBase'
import { IGenre } from '../models/GenreModel'

class GenreService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/genres`

    constructor() {
        super()
    }

    getList = (): Promise<IGenre> => this.get(this._path)

    addGenre = (data: IGenre): Promise<IGenre> =>
        this.post<IGenre>(this._path, data)

    updateGenre = (data: IGenre): Promise<IGenre> =>
        this.patch(`${this._path}/${data.id}`, { name: data.name })

    deleteGenre = (id: string): Promise<void> =>
        this.delete(`${this._path}/${id}`)
}

export default GenreService
