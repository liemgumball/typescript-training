import ServiceBase from "./ServiceBase";

class SongService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/songs?_expand=genre`

    constructor() {
        super()
    }

    getList = <T>(): Promise<T> => {
        return this.get(this._path)
    }
}

export default SongService