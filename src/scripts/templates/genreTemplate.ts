import { GENRE_RULES } from '../constants/constants'
import { truncateName } from '../helpers/format'
import GenreModel from '../models/genreModel'

class GenreTemplate {
  constructor() {}

  /**
   * get html template to render genres
   * @param {GenreModel} genre model instance of genre
   * @param {Boolean} active if the genre is selected or not
   * @returns html template
   */
  getGenreTemplate = (genre: GenreModel, active?: boolean): string => `
    <li class="genres__list__item text text-sub ${
      active ? 'active' : ''
    }" data-id="${genre.id}" title="${genre.name}">
      ${truncateName(genre.name, GENRE_RULES.ITEM_MAX_LENGTH)}
      <button class="genre__remove btn btn--icon fas fa-trash" title="remove genre">
      </button>
    </li>
    `
}

export default GenreTemplate
