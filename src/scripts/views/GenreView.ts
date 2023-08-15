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

    /**
     * renders the given genres list
     * @param genres list of genres instances
     */
    renderList = (genres: GenreModel[]): void => {
        genres.forEach(this.renderGenre)
    }

    /**
     * render the given genre
     * @param genre genre instance
     */
    renderGenre = (genre: GenreModel): void => {
        this.listGenreElement.innerHTML +=
            Template.genre.getGenreTemplate(genre)
    }

    /**
     * get id of the current genre
     * @returns id of genre
     */
    getCurrentGenreId = (): string => {
        const ele = this.listGenreElement.querySelector('li.active')
        return ele?.getAttribute('data-id') || ''
    }

    /**
     * add delegated event listener switching genre
     * @param handleSwitchGenre controller handle function
     */
    addDelegateSwitchGenreListener = (
        handleSwitchGenre: (genreId?: string) => void,
    ): void => {
        this.listGenreElement.addEventListener('click', (event) => {
            event.preventDefault()
            const ele = (event.target as HTMLElement).closest(this.genreElement)
            if (ele) {
                const genreId = ele.getAttribute('data-id')!
                handleSwitchGenre(genreId)
            }
        })
    }

    /**
     * add event listener adding genre
     * @param handleAddGenre controller handle function
     */
    addAddGenreListener = (handleAddGenre: () => void): void => {
        this.addGenreBtn.addEventListener('click', () => {
            handleAddGenre()
        })
    }

    /**
     * add delegated event listener editting genre
     * @param handleEditGenre controller handle function
     */
    addDelegateEditGenreListener = (
        handleEditGenre: (data: IGenre) => void,
    ): void => {
        this.listGenreElement.addEventListener('dblclick', (event) => {
            event.preventDefault()
            const ele = (event.target as HTMLElement).closest(
                this.genreElement,
            ) as HTMLElement
            if (ele) {
                const genreId = ele.getAttribute('data-id')
                const genreName = ele.innerText
                handleEditGenre({ id: genreId, name: genreName } as IGenre)
            }
        })
    }

    /**
     * add delegated event listener removing genre
     * @param handleRemoveGenre controller handle function
     */
    addDelegateRemoveGenreListener = (
        handleRemoveGenre: (genreId: string) => void,
    ): void => {
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
                    handleRemoveGenre(genreId!)
                }
            }
        })
    }

    /**
     * add event listener saving genre
     * @param handleSaveGenre controller handle function
     */
    addSaveGenreListener = (handleSaveGenre: (data: IGenre) => void): void => {
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
            handleSaveGenre({
                id: id,
                name: inputElement.value.trim(),
            } as IGenre)
        })
    }

    /**
     * switches to the given genre
     * @param genreId id of the genre
     */
    switchGenre = (genreId?: string): void => {
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

    /**
     * render genre text input
     * @param data data of genre
     */
    genreInputPopup = (data?: IGenre): void => {
        //add genre case
        if (!data) {
            const genreElement = document.createElement('li')
            genreElement.className = 'genres__list__edit text text-sub'
            genreElement.setAttribute('data-id', COMMON.EMPTY)

            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.className = 'input genre-edit '

            genreElement.appendChild(inputElement)
            this.listGenreElement.appendChild(genreElement)
            inputElement.focus()
        } else {
            //update genre case
            const genreElement = this.listGenreElement.querySelector(
                'li[data-id="' + data.id + '"]',
            )! as HTMLLIElement
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.className = 'input genre-edit '
            const value = genreElement.innerText
            genreElement.innerText = COMMON.EMPTY

            inputElement.value = value

            genreElement.appendChild(inputElement)
            inputElement.focus()
        }
    }

    /**
     * close the genre element having input inside
     */
    closeInput = (): void => {
        this.listGenreElement.querySelector('input')?.parentElement?.remove()
    }

    /**
     * update the genre element
     * @param genre instance of genre
     */
    updateGenre = (genre: GenreModel): void => {
        const target = this.listGenreElement.querySelector(
            'li[data-id="' + genre.id + '"]',
        ) as HTMLElement

        //render a genre that active
        target.outerHTML = Template.genre.getGenreTemplate(genre, true)
        target.setAttribute('data-id', genre.id)
    }

    /**
     * remove genre element
     * @param genreId if of genre
     */
    removeGenre = (genreId: string): void => {
        this.listGenreElement
            .querySelector('li[data-id="' + genreId + '"]')
            ?.remove()
    }
}

export default GenreView
