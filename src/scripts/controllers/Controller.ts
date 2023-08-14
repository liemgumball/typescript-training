import { MESSAGE, MODAL_TYPE } from '../constants/constants'
import { IGenre } from '../models/GenreModel'
import Model from '../models/Model'
import SongModel, { ISong } from '../models/SongModel'
import View from '../views/View'

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
            console.log(error)
            alert(MESSAGE.PROCESS_FAILED)
        }
    }

    initModal = (): void => {
        this._view.modal.addCloseListener()
        this._view.modal.addAddSongListener(this.addSong)
        this._view.modal.addFormSubmitListener(this.saveSong)
    }

    initGenre = async (): Promise<void> => {
        await this._model.genres.init()
        this._view.genre.renderList(this._model.genres.list)
        this._view.genre.addDelegateSwitchGenreListener(this.switchGenre)
        this._view.genre.addAddGenreListener(this.addGenre)
        this._view.genre.addDelegateEditGenreListener(this.editGenre)
        this._view.genre.addDelegateRemoveGenreListener(this.removeGenre)
    }

    initSong = async (): Promise<void> => {
        await this._model.songs.init()
        this._view.song.renderList(this._model.songs.list)
        this._view.song.addSearchSongListener(this.renderSong)
    }

    renderSong = () => {
        let songs = this._model.songs.getSongsByGenreId(
            this._view.genre.getSelectedGenreId(),
        )
        songs = this.filterSongByKeyword(songs)
        this._view.song.renderList(songs)
    }

    switchGenre = (genreId?: string) => {
        if (genreId !== this._view.genre.getSelectedGenreId()) {
            this._view.song.clearSearchKeyword()
            this._view.genre.switchGenre(genreId)
            this.renderSong()
        }
    }

    addGenre = () => {
        this._view.genre.genreInputPopup()
        this._view.genre.addSaveGenreListener(this.saveGenre)
    }

    editGenre = (data: IGenre) => {
        this._view.genre.genreInputPopup(data)
        this._view.genre.addSaveGenreListener(this.saveGenre)
    }

    saveGenre = async (data: IGenre): Promise<void> => {
        try {
            const genre = await this._model.genres.saveGenre(data)
            if (data.id === '') {
                // add a new genre case
                this._view.genre.closeInput()
                this._view.genre.renderGenre(genre)
            } else {
                //update genre case
                this._view.genre.updateGenre(genre)
            }
        } catch (err) {
            alert(MESSAGE.PROCESS_FAILED)
        }
    }

    removeGenre = async (genreId: string): Promise<void> => {
        try {
            this._model.genres.removeGenre(genreId)
            this._view.genre.removeGenre(genreId)
            this._view.genre.switchGenre()
            this.renderSong()
        } catch (error) {}
    }

    filterSongByKeyword = (songs: SongModel[]): SongModel[] => {
        const keyword = this._view.song.getSearchKeyword()
        return songs.filter((item) => {
            return (
                item.title.toLocaleLowerCase().includes(keyword) ||
                item.artist.toLocaleLowerCase().includes(keyword)
            )
        })
    }

    addSong = (): void => {
        this._view.modal.render(MODAL_TYPE.ADD_SONG)
        this._view.modal.setSelectOptions(this._model.genres.list)
    }

    saveSong = async (data: ISong): Promise<void> => {
        try {
            const song = await this._model.songs.saveSong(data)
            song.genre = this._model.genres.getGenreById(data.genreId)
            this.renderSong()
        } catch (error) {
            alert(MESSAGE.GENERAL_ERROR)
        }
    }
}

export default Controller
