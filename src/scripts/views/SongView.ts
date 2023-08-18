import { COMMON } from '../constants/constants'
import SongModel, { ISong } from '../models/SongModel'
import { Template } from '../templates/Template'

class SongView {
    private songsListElement: HTMLElement
    private songEle: string
    private removeBtn: string
    private searchInput: HTMLElement

    constructor() {
        this.songsListElement = document.querySelector(
            '.songs__list',
        )! as HTMLElement
        this.songEle = '.song'
        this.removeBtn = '.song__remove'
        this.searchInput = document.querySelector(
            '#search-song-input',
        )! as HTMLElement
    }

    renderList = (songs: SongModel[]): void => {
        this.songsListElement.innerHTML = COMMON.EMPTY
        songs.forEach((song) => {
            this.renderSong(song)
        }, this)
    }

    renderSong = (song: SongModel): void => {
        this.songsListElement.innerHTML += Template.song.getSongTemplate(song)
    }
}

export default SongView
