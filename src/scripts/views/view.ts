import GenreView from './genreView'
import ModalView from './modalView'
import SnackView from './snackView'
import SongView from './songView'

class View {
  public modal: ModalView
  public genre: GenreView
  public song: SongView
  public snack: SnackView

  constructor() {
    this.modal = new ModalView()
    this.genre = new GenreView()
    this.song = new SongView()
    this.snack = new SnackView()
  }
}

export default View
