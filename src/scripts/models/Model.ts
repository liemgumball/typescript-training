import GenreListModel from "./GenreListModel";
import SongListModel from "./SongListModel";

class Model {
    public genres: GenreListModel
    public songs: SongListModel
    
    constructor() {
        this.genres = new GenreListModel
        this.songs = new SongListModel
    }
}

export default Model