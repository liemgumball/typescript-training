import GenreModel from '../models/GenreModel'

class GenreTemplate {
    constructor() {}

    /**
     * genre html template
     * @param {GenreModel} genre model instance of genre
     * @param {Boolean} active if the genre is selected or not
     * @returns html to render genres
     */
    getGenreTemplate = (genre: GenreModel, active?: boolean): string => `
        <li class="genres__list__item text text-sub ${
            active ? 'active' : ''
        }" data-id="${genre.id}">
            ${genre.name}
            <button class="genre__remove btn btn--icon fa fa-trash"></button>
        </li>
    `
}

export default GenreTemplate
