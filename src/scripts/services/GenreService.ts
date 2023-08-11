import ServiceBase from "./ServiceBase";

class GenreService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/genres`

    constructor() {
        super()
    }

    getList = <T>(): Promise<T> => {
        return this.get(this._path)
    }
}

export default GenreService