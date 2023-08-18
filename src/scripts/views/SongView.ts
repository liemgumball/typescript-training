import { COMMON, EVENT_CODE } from '../constants/constants'
import SongModel, { ISong } from '../models/SongModel'
import { Template } from '../templates/Template'

class SongView {
    private songsListElement: HTMLElement
    private songEle: string
    private removeBtn: string
    private searchInput: HTMLInputElement

    constructor() {
        this.songsListElement = document.querySelector(
            '.songs__list',
        )! as HTMLElement
        this.songEle = '.song'
        this.removeBtn = '.song__remove'
        this.searchInput = document.querySelector(
            '#search-song-input',
        )! as HTMLInputElement
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

    addSearchSongListener = (controllerFilterSong: () => void): void => {
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.code !== EVENT_CODE.TAB) controllerFilterSong()
        })
    }

    getSearchKeyword = (): string => {
        return this.searchInput.value.trim().toLocaleLowerCase()
    }

    clearSearchKeyword = (): void => {
        this.searchInput.value = COMMON.EMPTY
    }
}

export default SongView
