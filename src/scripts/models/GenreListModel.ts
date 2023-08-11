import GenreService from '../services/GenreService'
import GenreModel, { IGenre } from './GenreModel'

class GenreListModel {
    public list: GenreModel[]
    private _service: GenreService

    constructor() {
        this._service = new GenreService()
    }

    init = async (): Promise<void> => {
        this.list = this.parseData(await this._service.getList())
        console.log(this.list)
    }

    parseData = (data: IGenre[]): GenreModel[] => {
        return data.map((item: IGenre) => new GenreModel(item))
    }
}

export default GenreListModel
