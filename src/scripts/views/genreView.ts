import { COMMON, CONFIRM_MESSAGE } from '../constants/constants'
import { EventCode } from '../constants/enums'
import GenreModel, { IGenre } from '../models/genreModel'
import { Template } from '../templates/template'

class GenreView {
  private listGenreElement: HTMLElement
  private addGenreBtn: HTMLElement
  private genreElement: string
  private removeBtn: string

  constructor() {
    this.listGenreElement = document.querySelector(
      '.genres__list'
    )! as HTMLElement

    this.addGenreBtn = document.querySelector(
      '#add-genre-btn'
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
    this.listGenreElement.innerHTML += Template.genre.getGenreTemplate(genre)
  }

  /**
   * get id of the current genre
   * @returns id of genre
   */
  getCurrentGenreId = (): string => {
    const ele: HTMLElement | null =
      this.listGenreElement.querySelector('li.active')
    return ele?.getAttribute('data-id') || ''
  }

  /**
   * add delegated event listener switching genre
   * @param handleSwitchGenre controller handle function
   */
  addDelegateSwitchGenreListener = (
    handleSwitchGenre: (genreId?: string) => void
  ): void => {
    this.listGenreElement.addEventListener('click', (event) => {
      event.preventDefault()
      const ele: HTMLElement | null = (event.target as HTMLElement).closest(
        this.genreElement
      )
      if (ele) handleSwitchGenre(ele.getAttribute('data-id')!)
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
    handleEditGenre: (data: IGenre) => void
  ): void => {
    this.listGenreElement.addEventListener('dblclick', (event) => {
      event.preventDefault()
      const ele: HTMLElement | null = (event.target as HTMLElement).closest(
        this.genreElement
      )

      if (ele)
        handleEditGenre({
          id: ele?.getAttribute('data-id'),
          name: ele?.innerText,
        } as IGenre)
    })
  }

  /**
   * add delegated event listener removing genre
   * @param handleRemoveGenre controller handle function
   */
  addDelegateRemoveGenreListener = (
    handleRemoveGenre: (genreId: string) => void
  ): void => {
    this.listGenreElement.addEventListener('click', (event) => {
      event.preventDefault()
      const removeEle: HTMLElement | null = (
        event.target as HTMLElement
      ).closest(this.removeBtn)

      if (removeEle) {
        //confirm remove including song in the list of genre
        if (window.confirm(CONFIRM_MESSAGE.REMOVE_GENRE))
          handleRemoveGenre(
            removeEle.parentElement?.getAttribute('data-id')?.trim()!
          )
      }
    })
  }

  /**
   * add event listener saving genre
   * @param handleSaveGenre controller handle function
   */
  addSaveGenreListener = (handleSaveGenre: (data: IGenre) => void): void => {
    const inputElement: HTMLInputElement | null =
      this.listGenreElement.querySelector('input')

    inputElement?.addEventListener('keydown', (event) => {
      if (event.code === EventCode.Enter) inputElement.blur()
    })

    inputElement?.addEventListener('blur', (event) => {
      handleSaveGenre({
        id: inputElement.parentElement?.getAttribute('data-id'),
        name: inputElement.value.trim(),
      } as IGenre)
    })
  }

  /**
   * switches to the given genre
   * @param genreId id of the genre
   */
  switchGenre = (genreId?: string): void => {
    this.listGenreElement.querySelector('li.active')?.classList.remove('active')
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
  genreInputPopup = (
    getGenreById: (id: string) => GenreModel | undefined,
    data?: IGenre
  ): void => {
    //add genre case
    if (!data) {
      const genreElement: HTMLLIElement = document.createElement('li')
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
      const genreElement: HTMLLIElement | null =
        this.listGenreElement.querySelector('li[data-id="' + data.id + '"]')

      if (genreElement) {
        const inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.className = 'input genre-edit '
        // const value = genreElement.innerText
        genreElement.innerText = COMMON.EMPTY

        inputElement.value = getGenreById(data.id!)?.name!

        genreElement.appendChild(inputElement)
        inputElement.focus()
      }
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
    const target: HTMLLIElement | null = this.listGenreElement.querySelector(
      'li[data-id="' + genre.id + '"]'
    )

    //render a genre that active
    if (target) {
      target.outerHTML = Template.genre.getGenreTemplate(genre, true)
      target.setAttribute('data-id', genre.id)
    }
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
