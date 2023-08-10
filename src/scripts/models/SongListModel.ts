import SongService from "../services/SongService";
import SongModel, { Song } from "./SongModel";

class SongListModel {
    public list: SongModel[]
    private _service: SongService

    constructor() {
        this._service = new SongService
    }

    init = async (): Promise<void> => {
        this.list = await this.parseData(await this._service.getList())
        console.log('list',this.list)
    }

    parseData = (data: Song[]): SongModel[] => {
        console.log('parse',data)
        return data.map((item: Song) => new SongModel(item))
    }
}

export default SongListModel