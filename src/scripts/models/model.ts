import GenreListModel from './genreListModel'
import SongListModel from './songListModel'

class Model {
  public genres: GenreListModel
  public songs: SongListModel

  constructor() {
    this.genres = new GenreListModel()
    this.songs = new SongListModel()
  }
}

export default Model
