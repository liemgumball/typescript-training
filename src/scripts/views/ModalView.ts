import { COMMON, MODAL_TITLE } from '../constants/constants'
import SongModel, { ISong } from '../models/songModel'
import { Template } from '../templates/template'
import GenreModel from '../models/genreModel'
import { validateSongUrl } from '../helpers/songHelper'
import { ErrorCode, ModalType } from '../constants/enums'

class ModalView {
  private modal: HTMLElement
  private modalDialog: HTMLFormElement
  private modalClose: HTMLElement
  private addSongBtn: HTMLButtonElement

  constructor() {
    this.modal = document.querySelector('.modal')! as HTMLElement
    this.modalDialog = document.querySelector(
      '.modal__dialog'
    )! as HTMLFormElement
    this.modalClose = document.querySelector('.modal__close')! as HTMLElement
    this.addSongBtn = document.querySelector(
      '#add-song-btn'
    )! as HTMLButtonElement
  }

  /**
   * open the modal
   */
  open = (): void => {
    this.modal.classList.add('open')
  }

  /**
   * close the modal
   */
  close = (): void => {
    this.modal.classList.remove('open')
  }

  /**
   * add event listener closing modal
   */
  addCloseListener = (): void => {
    this.modalClose.addEventListener('click', () => this.close())
  }

  /**
   * add event listener adding song
   * @param handleAddSong controller handle function
   */
  addAddSongListener = (handleAddSong: () => void): void => {
    this.addSongBtn.addEventListener('click', () => {
      handleAddSong()
    })
  }

  /**
   * add event listener submiting
   * @param handleSubmit controller handle function
   */
  addFormSubmitListener = (handleSubmit: (data: ISong) => void): void => {
    this.modalDialog.addEventListener('submit', (event) => {
      event.preventDefault()

      const id: string = this.modalDialog.getAttribute('data-id')!
      const songTitle: string = this.modalDialog.Title.value.trim()
      const songArtist: string = this.modalDialog.Artist.value.trim()
      const songGenreId: string = (this.modalDialog.Genre as HTMLSelectElement)
        .value
      const songLink: string = this.modalDialog.Link.value.trim()
      const songLastEdited: string = new Date().toISOString()

      const data: ISong = {
        id: id!,
        title: songTitle,
        artist: songArtist,
        lastEdited: songLastEdited,
        link: songLink,
        genreId: songGenreId,
      }

      const errors = this.validateInputData(data)
      if (errors.length > 0) {
        window.alert(errors.join('\n'))
      } else {
        handleSubmit(data)
        this.close()
      }
    })
  }

  /**
   * add event listener editting song
   * @param song song instance to edit
   * @param handleEditSong controller handle function
   */
  addEditSongListener = (
    song: SongModel,
    handleEditSong: (song: SongModel) => void
  ): void => {
    const editBtn: HTMLButtonElement | null = document.querySelector(
      '#modal__dialog__edit-btn'
    )
    editBtn?.addEventListener('click', () => {
      handleEditSong(song)
    })
  }

  /**
   * validate song data
   * @param data data of the song
   * @returns error message if invalid
   */
  validateInputData = (data: ISong): ErrorCode[] => {
    let errors: ErrorCode[] = []

    if (!data.title && !data.artist && !data.link) {
      errors.push(ErrorCode.WHITE_SPACE_INVALID)
    }

    // Validate link
    if (!validateSongUrl(data.link)) {
      errors.push(ErrorCode.LINK_INVALID)
    }
    return errors
  }

  /**
   * render the modal
   * @param type type of the modal
   * @param data song data to render
   */
  render = (type: ModalType, data?: SongModel): void => {
    switch (type) {
      case ModalType.SongDetail:
        this.renderSongDetail(data!)
        break

      case ModalType.AddSong:
        this.renderSongInput(MODAL_TITLE.ADD_SONG)
        break

      case ModalType.EditSong:
        this.renderSongInput(MODAL_TITLE.EDIT_SONG, data)
        break

      default:
        const _exhaustiveCheck: never = type
        return _exhaustiveCheck
    }
    this.open()
  }

  /**
   * render song detais
   * @param data song data
   */
  renderSongDetail = (data: SongModel): void => {
    const template: string = Template.song.getSongDetail(data)
    this.modalDialog.innerHTML = template
  }

  /**
   * render form input fields of the song
   * @param title title of the form
   * @param data song data
   */
  renderSongInput = (title: string, data?: SongModel): void => {
    this.modalDialog.setAttribute('data-id', data?.id || COMMON.EMPTY)
    const template: string = Template.modal.getSongInputForm(title, data)
    this.modalDialog.innerHTML = template
    this.modalDialog
      .querySelector('#modal__dialog__cancel-btn')
      ?.addEventListener('click', () => {
        this.close()
      })
  }

  /**
   * set options for the select input
   * @param genres list of genres
   * @param selectedOptionValue selected genre option
   */
  setSelectOptions = (
    genres: GenreModel[],
    selectedOptionValue?: string
  ): void => {
    const selectGenreELe = this.modalDialog.Genre as HTMLSelectElement
    selectGenreELe.innerHTML = COMMON.EMPTY

    genres.forEach((genre) => {
      const optionEle: HTMLOptionElement = document.createElement('option')
      optionEle.innerText = genre.name
      optionEle.value = genre.id
      optionEle.selected = genre.id === selectedOptionValue

      selectGenreELe.appendChild(optionEle)
    })
  }
}

export default ModalView
