import { COMMON, MESSAGE, MODAL_TYPE } from '../constants/constants'
import SongModel, { ISong } from '../models/SongModel'
import { Template } from '../templates/Template'
import GenreModel from '../models/GenreModel'
import { validateSongUrl } from '../helpers/util'

class ModalView {
    private modal: HTMLElement
    private modalDialog: HTMLFormElement
    private modalClose: HTMLElement
    private addSongBtn: HTMLButtonElement

    constructor() {
        this.modal = document.querySelector('.modal')! as HTMLElement
        this.modalDialog = document.querySelector(
            '.modal__dialog',
        )! as HTMLFormElement
        this.modalClose = document.querySelector(
            '.modal__close',
        )! as HTMLElement
        this.addSongBtn = document.querySelector(
            '#add-song-btn',
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

    addCloseListener = (): void => {
        this.modalClose.addEventListener('click', () => this.close())
    }

    /**
     * adding the add song event listener
     */
    addAddSongListener = (controllerAddSong: () => void): void => {
        this.addSongBtn.addEventListener('click', () => {
            controllerAddSong()
        })
    }

    addFormSubmitListener = (controllerSubmit: (data: ISong) => void): void => {
        this.modalDialog.addEventListener('submit', (event) => {
            event.preventDefault()

            const id = this.modalDialog.getAttribute('data-id')
            const songTitle = this.modalDialog.Title.value.trim()
            const songArtist = this.modalDialog.Artist.value.trim()
            const songGenreId = (this.modalDialog.Genre as HTMLSelectElement)
                .value
            const songLink = this.modalDialog.Link.value.trim()
            const songLastEdited = new Date().toISOString()

            const data: ISong = {
                id: id!,
                title: songTitle,
                artist: songArtist,
                lastEdited: songLastEdited,
                link: songLink,
                genreId: songGenreId,
            }

            const errors = this.validateInputData(data)
            if (!errors) {
                controllerSubmit(data)
                this.close()
            } else {
                window.alert(errors)
            }
        })
    }

    addEditSongListener = (
        song: SongModel,
        controllerEditSong: (song: SongModel) => void,
    ) => {
        const editBtn = document.querySelector('#modal__dialog__edit-btn')
        editBtn?.addEventListener('click', () => {
            controllerEditSong(song)
        })
    }

    validateInputData = (data: ISong) => {
        {
            let errors = COMMON.EMPTY

            // Validate title
            if (!data.title.trim()) {
                errors = MESSAGE.WHITE_SPACE_INVALID
            }

            // Validate artist
            if (!data.artist.trim()) {
                errors = MESSAGE.WHITE_SPACE_INVALID
            }

            // Validate link
            if (!data.link.trim()) {
                errors = MESSAGE.WHITE_SPACE_INVALID
            } else if (!validateSongUrl(data.link)) {
                errors += `\n${MESSAGE.LINK_INVALID}`
            }

            // Return the errors object
            return errors
        }
    }

    render = (type: string, data?: SongModel): void => {
        switch (type) {
            case MODAL_TYPE.SONG_DETAIL:
                this.renderSongDetail(data!)
                break

            case MODAL_TYPE.ADD_SONG:
                this.renderSongInput(type)
                break

            case MODAL_TYPE.EDIT_SONG:
                this.renderSongInput(type, data)
                break

            default:
                break
        }
        this.open()
    }

    renderSongDetail = (data: SongModel) => {
        const template = Template.song.getSongDetail(data)
        this.modalDialog.innerHTML = template
    }

    renderSongInput = (title: string, data?: SongModel): void => {
        this.modalDialog.setAttribute('data-id', data?.id || COMMON.EMPTY)
        const template = Template.modal.getSongInputForm(title, data)
        this.modalDialog.innerHTML = template
        this.modalDialog
            .querySelector('#modal__dialog__cancel-btn')
            ?.addEventListener('click', () => {
                this.close()
            })
    }

    setSelectOptions = (
        genres: GenreModel[],
        selectedOptionValue?: string,
    ): void => {
        const selectGenreELe = this.modalDialog.Genre as HTMLSelectElement
        selectGenreELe.innerHTML = COMMON.EMPTY

        genres.forEach((genre) => {
            const optionEle = document.createElement('option')
            optionEle.innerText = genre.name
            optionEle.value = genre.id
            optionEle.selected = genre.id === selectedOptionValue

            selectGenreELe.appendChild(optionEle)
        })
    }
}

export default ModalView
