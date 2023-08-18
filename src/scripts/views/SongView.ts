import { COMMON, EVENT_CODE, MESSAGE } from '../constants/constants'
import SongModel from '../models/SongModel'
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
        if (songs.length) {
            songs.forEach(this.renderSong)
        } else {
            this.songsListElement.innerHTML +=
                Template.song.getNoneSongTemplate()
        }
    }

    renderSong = (song: SongModel): void => {
        this.songsListElement.innerHTML += Template.song.getSongTemplate(song)
    }

    addSearchSongListener = (controllerFilterSong: () => void): void => {
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.code !== EVENT_CODE.TAB) controllerFilterSong()
        })
    }

    addDelegateViewSongDetailListener = (
        controllerViewSongDetail: (songid: string) => void,
    ): void => {
        this.songsListElement.addEventListener('click', (event) => {
            event.preventDefault()

            const ele = (event.target as HTMLElement).closest(this.songEle)
            if (ele) {
                const songid = ele
                    .parentElement!.getAttribute('data-id')
                    ?.trim()
                controllerViewSongDetail(songid!)
            }
        })
    }

    addDelegateRemoveSongListener = (
        controllerRemoveSong: (songid: string) => void,
    ): void => {
        this.songsListElement.addEventListener('click', (event) => {
            event.preventDefault()
            const removeEle = (event.target as HTMLElement).closest(
                this.removeBtn,
            )
            if (removeEle) {
                if (window.confirm(MESSAGE.REMOVE_SONG)) {
                    const songid =
                        removeEle.parentElement!.getAttribute('data-id')
                    controllerRemoveSong(songid!)
                }
            }
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
