import {
  COMMON,
  ERROR_MESSAGES,
  SNACKBAR_MESSAGE,
} from '../constants/constants'
import { ErrorCode, MessageType, ModalType } from '../constants/enums'
import GenreModel, { IGenre } from '../models/genreModel'
import Model from '../models/model'
import SongModel, { ISong } from '../models/songModel'
import View from '../views/view'

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
      console.error(error)
      this._view.snack.show(
        MessageType.Failed,
        ERROR_MESSAGES[ErrorCode.PROCESS_FAILED]
      )
    }
  }

  /**
   * initialize the modal
   */
  private initModal = (): void => {
    this._view.modal.addCloseListener()
    this._view.modal.addAddSongListener(this.addSong)
    this._view.modal.addFormSubmitListener(this.saveSong)
  }

  /**
   * initialize Genres List and Events
   */
  private initGenre = async (): Promise<void> => {
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
  private initSong = async (): Promise<void> => {
    await this._model.songs.init()
    this._view.song.renderList(this._model.songs.list)
    this._view.song.addSearchSongListener(this.renderSong)
    this._view.song.addDelegateViewSongDetailListener(this.viewSongDetail)
    this._view.song.addDelegateRemoveSongListener(this.removeSong)
  }

  /**
   * render song following the current selected genre and keyword
   */
  private renderSong = (): void => {
    let songs: SongModel[] = this._model.songs.getSongsByGenreId(
      this._view.genre.getCurrentGenreId()
    )
    songs = this.filterSongByKeyword(songs)
    this._view.song.renderList(songs)
  }

  /**
   *  switch to selected genre if available
   * @param genreId id of the genre selected
   */
  private switchGenre = (genreId?: string): void => {
    if (genreId !== this._view.genre.getCurrentGenreId()) {
      this._view.song.clearSearchKeyword()
      this._view.genre.switchGenre(genreId)
      this.renderSong()
    }
  }

  /**
   * add genre feature
   */
  private addGenre = (): void => {
    this._view.genre.genreInputPopup(this._model.genres.getGenreById)
    this._view.genre.addSaveGenreListener(this.checkGenre)
  }

  /**
   * edit genre feature
   * @param data information of the genre
   */
  private editGenre = (data: IGenre): void => {
    this._view.genre.genreInputPopup(this._model.genres.getGenreById, data)
    this._view.genre.addSaveGenreListener(this.checkGenre)
  }

  /**
   * handle if genre name is invalid & save if valid
   * @param data information of the genre
   */
  private checkGenre = (data: IGenre): void => {
    const errors: ErrorCode[] = this.validateGenre(data)
    if (!errors.length) {
      this.saveGenre(data)
    } else {
      //handle if the name is invalid
      this._view.snack.show(MessageType.Failed, ERROR_MESSAGES[errors[0]])

      if (data.id) {
        this._view.genre.updateGenre(
          this._model.genres.getGenreById(this._view.genre.getCurrentGenreId())!
        )
      } else {
        this._view.genre.removeGenre(COMMON.EMPTY)
      }
    }
  }

  /**
   * save the genre and render
   * @param data information of genre
   */
  private saveGenre = async (data: IGenre): Promise<void> => {
    try {
      const genre: GenreModel = await this._model.genres.saveGenre(data)
      // add a new genre case
      if (data.id === COMMON.EMPTY) {
        this._view.genre.closeInput()
        this._view.genre.renderGenre(genre)
      }
      //update genre case
      else {
        this._view.genre.updateGenre(genre)
        this._model.songs.updateGenreForSong(genre)
        this.renderSong()
      }
      this._view.snack.show(MessageType.Success, SNACKBAR_MESSAGE.SAVE_SUCCESS)
    } catch (err) {
      this._view.snack.show(
        MessageType.Failed,
        ERROR_MESSAGES[ErrorCode.PROCESS_FAILED]
      )
    }
  }

  /**
   * check if the value of genre is valid
   * @param data data of genre
   * @returns list of errors
   */
  private validateGenre = (data: IGenre): ErrorCode[] => {
    const errors: ErrorCode[] = []
    // case value is empty
    if (!data.name) {
      errors.push(ErrorCode.WHITE_SPACE_INVALID)
    }
    // case value is same as other genre
    else if (!this._model.genres.isValidName(data)) {
      errors.push(ErrorCode.REPEATED_ERROR)
    }
    return errors
  }

  /**
   * handle remove genre and render
   * @param genreId id of the genre
   */
  private removeGenre = async (genreId: string): Promise<void> => {
    try {
      this._model.genres.removeGenre(genreId)
      this._view.genre.removeGenre(genreId)
      this._model.songs.removeSongByGenreId(genreId)
      this._view.genre.switchGenre()
      this.renderSong()
      this._view.snack.show(
        MessageType.Success,
        SNACKBAR_MESSAGE.REMOVE_SUCCESS
      )
    } catch (error) {
      this._view.snack.show(
        MessageType.Failed,
        ERROR_MESSAGES[ErrorCode.PROCESS_FAILED]
      )
    }
  }

  /**
   * filter list of by keyword
   * @param songs list of songs
   * @returns filtered list
   */
  private filterSongByKeyword = (songs: SongModel[]): SongModel[] => {
    const keyword: string = this._view.song.getSearchKeyword()
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
  private addSong = (): void => {
    this._view.modal.render(ModalType.AddSong)
    this._view.modal.setSelectOptions(this._model.genres.list)
  }

  /**
   * edit song feature
   * @param song song to be edited
   */
  private editSong = (song: SongModel): void => {
    this._view.modal.render(ModalType.EditSong, song)
    this._view.modal.setSelectOptions(this._model.genres.list, song.genreId)
  }

  /**
   * view song detail feature and add edit song listener
   * @param id id of the song
   */
  private viewSongDetail = (id: string): void => {
    const song: SongModel | undefined = this._model.songs.getSongById(id)
    if (song) {
      this._view.modal.render(ModalType.SongDetail, song)
      this._view.modal.addEditSongListener(song, this.editSong)
    } else {
      this._view.snack.show(
        MessageType.Failed,
        ERROR_MESSAGES[ErrorCode.PROCESS_FAILED]
      )
    }
  }

  /**
   * remove song event
   * @param id id of the song
   */
  private removeSong = async (id: string): Promise<void> => {
    try {
      await this._model.songs.deleteSong(id)
      this.renderSong()
      this._view.snack.show(
        MessageType.Success,
        SNACKBAR_MESSAGE.REMOVE_SUCCESS
      )
    } catch {
      this._view.snack.show(
        MessageType.Failed,
        ERROR_MESSAGES[ErrorCode.PROCESS_FAILED]
      )
    }
  }

  /**
   * save the song and render
   * @param data information of the song
   */
  private saveSong = async (data: ISong): Promise<void> => {
    try {
      const song: SongModel = await this._model.songs.saveSong(data)
      song.genre = this._model.genres.getGenreById(data.genreId)
      this.renderSong()
      this._view.snack.show(MessageType.Success, SNACKBAR_MESSAGE.SAVE_SUCCESS)
    } catch (error) {
      this._view.snack.show(
        MessageType.Failed,
        ERROR_MESSAGES[ErrorCode.PROCESS_FAILED]
      )
    }
  }
}

export default Controller
