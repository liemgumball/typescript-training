import { generateId } from "../helpers/util";

export interface IGenre {
    id: string;
    name: string;
}

class GenreModel {
    public id: string;
    public name: string;

    constructor(genre: IGenre) {
        this.id = genre.id || generateId()
        this.name = genre.name
    }
}

export default GenreModel