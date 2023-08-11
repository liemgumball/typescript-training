import GenreModel from "../models/GenreModel"
import { Template } from "../templates/Template"

class GenreView {
    private listGenreElement: HTMLElement
    private genreElement: string
    private removeBtn: string
    constructor() {
        this.listGenreElement = document.querySelector('.genres__list')! as HTMLElement
        this.genreElement = '.genres__list__item'
        this.removeBtn = '.genre__remove'
    }

    renderList = (genres: GenreModel[]): void => {
        genres.forEach(genre => {
            this.renderGenre(genre)
        }, this)
    }

    renderGenre = (genre: GenreModel): void => {
        this.listGenreElement.innerHTML += 
            Template.genre.getGenreTemplate(genre)
    }
}

export default GenreView