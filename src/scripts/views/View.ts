import GenreView from './GenreView'
import ModalView from './ModalView'
import SongView from './SongView'

class View {
    public modal: ModalView
    public genre: GenreView
    public songs: SongView

    constructor() {
        this.modal = new ModalView()
        this.genre = new GenreView()
        this.songs = new SongView()
    }
}

export default View
