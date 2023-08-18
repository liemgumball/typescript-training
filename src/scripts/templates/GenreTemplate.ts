import { genreNameDisplay } from '../helpers/util'
import GenreModel from '../models/GenreModel'

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
            ${genreNameDisplay(genre.name)}
            <button class="genre__remove btn btn--icon fas fa-trash"></button>
        </li>
    `
}

export default GenreTemplate
