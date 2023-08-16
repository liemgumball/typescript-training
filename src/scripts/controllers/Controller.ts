import { COMMON, MESSAGE } from '../constants/constants'
import {
    MODAL_TYPE,
    SNACKBAR_TYPE,
    inValidGenreFields,
} from '../constants/enums'
import { IGenre } from '../models/GenreModel'
import Model from '../models/Model'
import SongModel, { ISong } from '../models/SongModel'
import View from '../views/View'

class Controller {
    private _view: View
    private _model: Model

    constructor(view: View, model: Model) {
        this._view = view
        this._model = model
    }

    /**
     * initializes the web site
     */
    init = async (): Promise<void> => {
        try {
            this.initModal()
            await this.initGenre()
            await this.initSong()
        } catch (error) {
            this._view.snack.render(
                SNACKBAR_TYPE.Failed,
                MESSAGE.PROCESS_FAILED,
            )
        }
    }

    /**
     * initialize the modal
     */
    initModal = (): void => {
        this._view.modal.addCloseListener()
        this._view.modal.addAddSongListener(this.addSong)
        this._view.modal.addFormSubmitListener(this.saveSong)
    }

    /**
     * initialize Genres List and Events
     */
    initGenre = async (): Promise<void> => {
        await this._model.genres.init()
        this._view.genre.renderList(this._model.genres.list)
        this._view.genre.addDelegateSwitchGenreListener(this.switchGenre)
        this._view.genre.addAddGenreListener(this.addGenre)
        this._view.genre.addDelegateEditGenreListener(this.editGenre)
        this._view.genre.addDelegateRemoveGenreListener(this.removeGenre)
    }

    /**
     * initialize Songs List and Events
     */
    initSong = async (): Promise<void> => {
        await this._model.songs.init()
        this._view.song.renderList(this._model.songs.list)
        this._view.song.addSearchSongListener(this.renderSong)
        this._view.song.addDelegateViewSongDetailListener(this.viewSongDetail)
        this._view.song.addDelegateRemoveSongListener(this.removeSong)
    }

    /**
     * render song following the current selected genre and keyword
     */
    renderSong = (): void => {
        let songs = this._model.songs.getSongsByGenreId(
            this._view.genre.getCurrentGenreId(),
        )
        songs = this.filterSongByKeyword(songs)
        this._view.song.renderList(songs)
    }

    /**
     *  switch to selected genre if available
     * @param genreId id of the genre selected
     */
    switchGenre = (genreId?: string): void => {
        if (genreId !== this._view.genre.getCurrentGenreId()) {
            this._view.song.clearSearchKeyword()
            this._view.genre.switchGenre(genreId)
            this.renderSong()
        }
    }

    /**
     * add genre feature
     */
    addGenre = (): void => {
        this._view.genre.genreInputPopup()
        this._view.genre.addSaveGenreListener(this.saveGenre)
    }

    /**
     * edit genre feature
     * @param data information of the genre
     */
    editGenre = (data: IGenre): void => {
        this._view.genre.genreInputPopup(data)
        this._view.genre.addSaveGenreListener(this.saveGenre)
    }

    /**
     * save the genre and render
     * @param data information of genre
     */
    saveGenre = async (data: IGenre): Promise<void> => {
        //handle if the data is invalid
        const errors = this.validateGenre(data)
        if (errors.length > 0) {
            if (errors.includes(inValidGenreFields.Empty)) {
                if (data.id) {
                    this._view.genre.updateGenre(
                        this._model.genres.getGenreById(
                            this._view.genre.getCurrentGenreId(),
                        )!,
                    )
                } else {
                    this._view.snack.render(
                        SNACKBAR_TYPE.Failed,
                        MESSAGE.SAVE_FAILURE,
                    )
                    this._view.genre.removeGenre(COMMON.EMPTY)
                }
            } else {
                // if same as other genres then alert
                if (errors.includes(inValidGenreFields.Repeated))
                    this._view.snack.render(
                        SNACKBAR_TYPE.Failed,
                        MESSAGE.REPEATED_GENRE_ERROR,
                    )
            }
        }
        // valid case
        else {
            try {
                const genre = await this._model.genres.saveGenre(data)
                // add a new genre case
                if (data.id === '') {
                    this._view.genre.closeInput()
                    this._view.genre.renderGenre(genre)
                }
                //update genre case
                else {
                    this._view.genre.updateGenre(genre)
                    this._model.songs.updateGenre(genre)
                    this.renderSong()
                }
                this._view.snack.render(
                    SNACKBAR_TYPE.Success,
                    MESSAGE.SAVE_SUCCESS,
                )
            } catch (err) {
                this._view.snack.render(
                    SNACKBAR_TYPE.Failed,
                    MESSAGE.PROCESS_FAILED,
                )
            }
        }
    }

    /**
     * check if the value of genre is valid
     * @param data data of genre
     * @returns list of errors
     */
    validateGenre = (data: IGenre): number[] => {
        const errors: number[] = []
        // case value is empty
        if (!data.name) {
            errors.push(inValidGenreFields.Empty)
        }
        // case value is same as other genre
        else if (!this._model.genres.isValidName(data)) {
            errors.push(inValidGenreFields.Repeated)
        }
        return errors
    }

    /**
     * handle remove genre and render
     * @param genreId id of the genre
     */
    removeGenre = async (genreId: string): Promise<void> => {
        try {
            this._model.genres.removeGenre(genreId)
            this._view.genre.removeGenre(genreId)
            this._model.songs.removeSongByGenreId(genreId)
            this._view.genre.switchGenre()
            this.renderSong()
            this._view.snack.render(
                SNACKBAR_TYPE.Success,
                MESSAGE.REMOVE_SUCCESS,
            )
        } catch (error) {
            this._view.snack.render(
                SNACKBAR_TYPE.Failed,
                MESSAGE.PROCESS_FAILED,
            )
        }
    }

    /**
     * filter list of by keyword
     * @param songs list of songs
     * @returns filtered list
     */
    filterSongByKeyword = (songs: SongModel[]): SongModel[] => {
        const keyword = this._view.song.getSearchKeyword()
        return songs.filter((item) => {
            return (
                item.title.toLocaleLowerCase().includes(keyword) ||
                item.artist.toLocaleLowerCase().includes(keyword)
            )
        })
    }

    /**
     * add song feature
     */
    addSong = (): void => {
        this._view.modal.render(MODAL_TYPE.ADD_SONG)
        this._view.modal.setSelectOptions(this._model.genres.list)
    }

    /**
     * edit song feature
     * @param song song to be edited
     */
    editSong = (song: SongModel): void => {
        this._view.modal.render(MODAL_TYPE.EDIT_SONG, song)
        this._view.modal.setSelectOptions(
            this._model.genres.list,
            song.genre?.id,
        )
    }

    /**
     * view song detail feature and add edit song listener
     * @param id id of the song
     */
    viewSongDetail = (id: string): void => {
        const song = this._model.songs.getSongById(id)
        if (song) {
            this._view.modal.render(MODAL_TYPE.SONG_DETAIL, song)
            this._view.modal.addEditSongListener(song, this.editSong)
        } else {
            this._view.snack.render(
                SNACKBAR_TYPE.Failed,
                MESSAGE.PROCESS_FAILED,
            )
        }
    }

    /**
     * remove song event
     * @param id id of the song
     */
    removeSong = async (id: string): Promise<void> => {
        try {
            await this._model.songs.deleteSong(id)
            this.renderSong()
            this._view.snack.render(
                SNACKBAR_TYPE.Success,
                MESSAGE.REMOVE_SUCCESS,
            )
        } catch {
            this._view.snack.render(
                SNACKBAR_TYPE.Failed,
                MESSAGE.PROCESS_FAILED,
            )
        }
    }

    /**
     * save the song and render
     * @param data information of the song
     */
    saveSong = async (data: ISong): Promise<void> => {
        try {
            const song = await this._model.songs.saveSong(data)
            song.genre = this._model.genres.getGenreById(data.genreId)
            this.renderSong()
            this._view.snack.render(SNACKBAR_TYPE.Success, MESSAGE.SAVE_SUCCESS)
        } catch (error) {
            this._view.snack.render(
                SNACKBAR_TYPE.Failed,
                MESSAGE.PROCESS_FAILED,
            )
        }
    }
}

export default Controller
