import { COMMON } from '../constants/constants'
import { parseData } from '../helpers/util'
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
        const list = await this._service.getList()
        this._list = list.map((item) => parseData(item, GenreModel))
    }

    getGenreById = (id: string): GenreModel | undefined =>
        this._list.find((item) => item.id === id)

    saveGenre = async (data: IGenre): Promise<GenreModel> => {
        if (data.id === COMMON.EMPTY) {
            const genre = parseData<IGenre, GenreModel>(
                await this._service.addGenre(data),
                GenreModel,
            )
            this._list.push(genre)
            return genre
        } else {
            const genre = parseData<IGenre, GenreModel>(
                await this._service.updateGenre(data),
                GenreModel,
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
