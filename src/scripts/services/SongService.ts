import { Song } from "../models/SongModel";
import ServiceBase from "./ServiceBase";

class SongService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/songs?_expand=genre`

    constructor() {
        super()
    }

    getList = async (): Promise<any> => {
        const x = await this.get(this._path) as Song[]
        console.log(x)
        return x 
    }
}

export default SongService