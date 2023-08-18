import ServiceBase from "./ServiceBase";

class GenreService extends ServiceBase {
    private _path = `${process.env.API_GATEWAY}/genres`

    constructor() {
        super()
    }

    getList = (): [] => {
        return this.get(this._path) as []
    }
}

export default GenreService