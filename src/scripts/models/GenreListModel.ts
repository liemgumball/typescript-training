import GenreService from "../services/GenreService";
import GenreModel, { Genre } from "./GenreModel";

class GenreListModel {
    public list: GenreModel[]
    private _service: GenreService;

    constructor() {
        this._service = new GenreService
    }

    init = async (): Promise<void> => {
        this.list = this.parseData(await this._service.getList())
        console.log(this.list)
    }

    parseData = (data: []): GenreModel[] => {
        return data.map((item: Genre) => new GenreModel(item))
    }
}

export default GenreListModel