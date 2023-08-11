import Model from "../models/Model";
import View from "../views/View";

class Controller {
    private _view!: View
    private _model!: Model

    constructor(view: View, model: Model) {
        this._view = view
        this._model = model
    }

    init = (): void => {
        try {
            this.initModal()
            this.initGenre()
            this.initSong()
        } catch (error) {
            alert('problem initializing')
        }
    }

    initModal = (): void => {
        this._view.modal.addAddSongListener()
    }

    initGenre = async (): Promise<void> => {
        await this._model.genres.init()
        this._view.genre.renderList(this._model.genres.list)
    }

    initSong = async (): Promise<void> => {
        await this._model.songs.init()
        this._view.songs.renderList(this._model.songs.list)
    }
}

export default Controller