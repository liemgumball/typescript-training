import { MESSAGE } from '../constants/constants'
import Model from '../models/Model'
import View from '../views/View'

class Controller {
    private _view!: View
    private _model!: Model

    constructor(view: View, model: Model) {
        this._view = view
        this._model = model
    }

    init = (): void => {
        this.initModal()
        this.initGenre()
        this.initSong()
    }

    initModal = (): void => {
        this._view.modal.addAddSongListener()
    }

    initGenre = async (): Promise<void> => {
        try {
            await this._model.genres.init()
            this._view.genre.renderList(this._model.genres.list)
        } catch (error) {
            alert(MESSAGE.PROCESS_FAILED)
        }
    }

    initSong = async (): Promise<void> => {
        try {
            await this._model.songs.init()
            this._view.songs.renderList(this._model.songs.list)
        } catch (error) {
            alert(MESSAGE.PROCESS_FAILED)
        }
    }
}

export default Controller
