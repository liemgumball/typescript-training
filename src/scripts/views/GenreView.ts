import { COMMON, EVENT_CODE, MESSAGE } from '../constants/constants'
import GenreModel, { IGenre } from '../models/GenreModel'
import { Template } from '../templates/Template'

class GenreView {
    private listGenreElement: HTMLElement
    private addGenreBtn: HTMLElement
    private genreElement: string
    private removeBtn: string
    constructor() {
        this.listGenreElement = document.querySelector(
            '.genres__list',
        )! as HTMLElement

        this.addGenreBtn = document.querySelector(
            '#add-genre-btn',
        )! as HTMLButtonElement
        this.genreElement = '.genres__list__item'
        this.removeBtn = '.genre__remove'
    }

    renderList = (genres: GenreModel[]): void => {
        genres.forEach((genre) => {
            this.renderGenre(genre)
        }, this)
    }

    renderGenre = (genre: GenreModel): void => {
        this.listGenreElement.innerHTML +=
            Template.genre.getGenreTemplate(genre)
    }

    getSelectedGenreId = (): string | null => {
        const ele = this.listGenreElement.querySelector('li.active')
        return ele!.getAttribute('data-id')
    }

    addDelegateSwitchGenreListener = (
        controllerSwitchGenre: (genreId?: string) => void,
    ): void => {
        this.listGenreElement.addEventListener('click', (event) => {
            event.preventDefault()
            const ele = (event.target as HTMLElement).closest('li')
            if (ele) {
                const genreId = ele.getAttribute('data-id')!
                controllerSwitchGenre(genreId)
            }
        })
    }

    addAddGenreListener = (controllerAddGenre: () => void): void => {
        this.addGenreBtn.addEventListener('click', () => {
            controllerAddGenre()
        })
    }

    addDelegateEditGenreListener = (
        controllerEditGenre: (data: IGenre) => void,
    ): void => {
        this.listGenreElement.addEventListener('dblclick', (event) => {
            event.preventDefault()
            const ele = (event.target as HTMLElement).closest('li')
            if (ele) {
                const genreId = ele?.getAttribute('data-id')!
                const genreName = ele?.innerText!
                controllerEditGenre({ id: genreId, name: genreName } as IGenre)
            }
        })
    }

    addDelegateRemoveGenreListener = (
        controllerRemoveGenre: (genreId: string) => void,
    ) => {
        this.listGenreElement.addEventListener('click', (event) => {
            event.preventDefault()
            const removeEle = (event.target as HTMLElement).closest(
                this.removeBtn,
            )

            if (removeEle) {
                const genreId = removeEle.parentElement
                    ?.getAttribute('data-id')!
                    .trim()

                //confirm remove including song in the list of genre
                if (window.confirm(MESSAGE.REMOVE_GENRE_CONFIRM)) {
                    controllerRemoveGenre(genreId!)
                }
            }
        })
    }

    addSaveGenreListener = (
        controllerSaveGenre: (data: IGenre) => void,
    ): void => {
        const inputElement = this.listGenreElement.querySelector('input')

        inputElement?.addEventListener('keydown', (event) => {
            if (
                event.code === EVENT_CODE.ENTER ||
                event.code === EVENT_CODE.ESC
            ) {
                if (event.code === EVENT_CODE.ESC)
                    inputElement.value = COMMON.EMPTY
                inputElement.blur()
            }
        })

        inputElement?.addEventListener('blur', (event) => {
            const id = inputElement.parentElement?.getAttribute('data-id')
            controllerSaveGenre({
                id: id,
                name: inputElement.value.trim(),
            } as IGenre)
        })
    }

    switchGenre = (genreId?: string) => {
        this.listGenreElement
            .querySelector('li.active')
            ?.classList.remove('active')
        if (genreId) {
            this.listGenreElement
                .querySelector('li[data-id="' + genreId + '"]')
                ?.classList.add('active')
        } else {
            this.listGenreElement
                .querySelector('li:not([data-id])')
                ?.classList.add('active')
        }
    }

    genreInputPopup = (data?: IGenre): void => {
        //add genre case
        if (!data) {
            const genreElement = document.createElement('li')
            genreElement.className = 'genres__list__edit text text-sub'
            genreElement.setAttribute('data-id', COMMON.EMPTY)

            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.className = 'genre-edit '

            genreElement.appendChild(inputElement)
            this.listGenreElement.appendChild(genreElement)
            inputElement.focus()
        } else {
            const genreElement = this.listGenreElement.querySelector(
                'li[data-id="' + data.id + '"]',
            )! as HTMLLIElement
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.className = 'genre-edit '
            const value = genreElement.innerText
            genreElement.innerText = COMMON.EMPTY

            inputElement.value = value

            genreElement.appendChild(inputElement)
            inputElement.focus()
        }
    }

    closeInput = () => {
        this.listGenreElement.querySelector('input')?.parentElement?.remove()
    }

    updateGenre = (genre: GenreModel) => {
        const target = this.listGenreElement.querySelector(
            'li[data-id="' + genre.id + '"]',
        )

        //render a genre that active
        target!.outerHTML = Template.genre.getGenreTemplate(genre, true)
        target!.setAttribute('data-id', genre.id!)
    }

    removeGenre = (genreId: string) => {
        this.listGenreElement
            .querySelector('li[data-id="' + genreId + '"]')
            ?.remove()
    }
}

export default GenreView
