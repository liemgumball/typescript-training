import { COMMON, MESSAGE } from '../constants/constants'
import { EVENT_CODE } from '../constants/enums'
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

    /**
     * render list of songs
     * @param songs list of songs
     */
    renderList = (songs: SongModel[]): void => {
        this.songsListElement.innerHTML = COMMON.EMPTY
        if (songs.length) {
            songs.forEach(this.renderSong)
        } else {
            this.songsListElement.innerHTML +=
                Template.song.getNoneSongTemplate()
        }
    }

    /**
     * render a song
     * @param song instance of song
     */
    renderSong = (song: SongModel): void => {
        this.songsListElement.innerHTML += Template.song.getSongTemplate(song)
    }

    /**
     * add event listener searching songs
     * @param handleSearch controller handle function
     */
    addSearchSongListener = (handleSearch: () => void): void => {
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.code !== EVENT_CODE.TAB) handleSearch()
        })
    }

    /**
     * add delegated event listener viewing song details
     * @param handleViewSongDetails controller handle function
     */
    addDelegateViewSongDetailListener = (
        handleViewSongDeta: (songid: string) => void,
    ): void => {
        this.songsListElement.addEventListener('click', (event) => {
            event.preventDefault()

            const ele = (event.target as HTMLElement).closest(this.songEle)
            if (ele) {
                const songid = ele
                    .parentElement!.getAttribute('data-id')
                    ?.trim()
                handleViewSongDeta(songid!)
            }
        })
    }

    /**
     * add delegated event listener removing song
     * @param handleRemoveSong controller handle function
     */
    addDelegateRemoveSongListener = (
        handleRemoveSong: (songid: string) => void,
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
                    handleRemoveSong(songid!)
                }
            }
        })
    }

    /**
     * get the keywords from the search field
     * @returns keyword
     */
    getSearchKeyword = (): string => {
        return this.searchInput.value.trim().toLocaleLowerCase()
    }

    /**
     * clear the search field
     */
    clearSearchKeyword = (): void => {
        this.searchInput.value = COMMON.EMPTY
    }
}

export default SongView
