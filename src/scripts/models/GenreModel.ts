import { generateId } from "../helpers/util";

export interface Genre {
    id: string;
    name: string;
}

class GenreModel {
    public id: string;
    public name: string;

    constructor(genre: Genre) {
        this.id = genre.id || generateId()
        this.name = genre.name
    }
}

export default GenreModel