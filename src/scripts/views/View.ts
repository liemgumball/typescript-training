import GenreView from './GenreView'
import ModalView from './ModalView'
import SnackView from './SnackView'
import SongView from './SongView'

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
