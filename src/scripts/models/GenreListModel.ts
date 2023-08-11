import GenreService from '../services/GenreService'
import GenreModel, { IGenre } from './GenreModel'

class GenreListModel {
    public list: GenreModel[]
    private _service: GenreService

    constructor() {
        this._service = new GenreService()
    }

    init = async (): Promise<void> => {
        this.list = this.parseData(
            await this._service.getList(),
        ) as GenreModel[]
        console.log(this.list)
    }

    parseData = (data: IGenre | IGenre[]): GenreModel | GenreModel[] => {
        if (data instanceof Array) {
            return data.map((item: IGenre) => new GenreModel(item))
        } else {
            return new GenreModel(data)
        }
    }

    saveGenre = async (data: IGenre): Promise<GenreModel> => {
        console.log('saveGenre', typeof data.id)
        if (data.id === '') {
            const genre = this.parseData(
                await this._service.addGenre(data),
            ) as GenreModel
            this.list.push(genre)
            return genre
        } else {
            const genre = this.parseData(
                await this._service.updateGenre(data),
            ) as GenreModel
            const idx = this.list.findIndex((item) => item.id === genre.id)
            this.list[idx] = genre
            return genre
        }
    }

    removeGenre = async (genreId: string) => {
        await this._service.deleteGenre(genreId)
        const idx = this.list.findIndex((item) => item.id === genreId)
        this.list.splice(idx, 1)
    }
}

export default GenreListModel
