import { COMMON } from '../constants/constants'
import GenreService from '../services/GenreService'
import GenreModel, { IGenre } from './GenreModel'

class GenreListModel {
    private _list: GenreModel[]
    private _service: GenreService

    constructor() {
        this._service = new GenreService()
    }

    get list() {
        return this._list
    }

    init = async (): Promise<void> => {
        this._list = this.parseData<IGenre[], GenreModel[]>(
            await this._service.getList(),
        )
    }

    parseData<IT, T>(data: IT) {
        if (data instanceof Array) {
            return data.map((item: IGenre) => new GenreModel(item)) as T
        } else {
            return new GenreModel(data as IGenre) as T
        }
    }

    saveGenre = async (data: IGenre): Promise<GenreModel> => {
        if (data.id === COMMON.EMPTY) {
            const genre = this.parseData<IGenre, GenreModel>(
                await this._service.addGenre(data),
            )
            this._list.push(genre)
            return genre
        } else {
            const genre = this.parseData<IGenre, GenreModel>(
                await this._service.updateGenre(data),
            )
            const idx = this._list.findIndex((item) => item.id === genre.id)
            this._list[idx] = genre
            return genre
        }
    }

    removeGenre = async (genreId: string) => {
        await this._service.deleteGenre(genreId)
        const idx = this._list.findIndex((item) => item.id === genreId)
        this._list.splice(idx, 1)
    }
}

export default GenreListModel
