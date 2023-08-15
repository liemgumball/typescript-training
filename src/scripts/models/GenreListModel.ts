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

    /**
     * initialize list of genres
     */
    init = async (): Promise<void> => {
        const list = await this._service.getList()
        this._list = list.map((item) => parseData(item, GenreModel))
    }

    /**
     * get genre by its id
     * @param id id of the genre
     * @returns genre
     */
    getGenreById = (id: string): GenreModel | undefined => {
        return this._list.find((item) => item.id === id)
    }

    /**
     * if the genre is valid
     * @param genre infomation of the genre
     * @returns is valid or not
     */
    isValidName = (genre: IGenre): boolean => {
        return this._list.every((item) => {
            if (item.id === genre.id) return true

            return (
                item.name.toLowerCase() !== genre.name.toLowerCase() &&
                genre.name.toLowerCase() !== 'all'
            )
        })
    }

    /**
     * save the genre
     * @param data information of the genre
     * @returns model of saved genre
     */
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

    /**
     * remove a genre
     * @param genreId id of the genre
     */
    removeGenre = async (genreId: string): Promise<void> => {
        await this._service.deleteGenre(genreId)
        const idx = this._list.findIndex((item) => item.id === genreId)
        this._list.splice(idx, 1)
    }
}

export default GenreListModel
