import { COMMON, CONFIRM_MESSAGE } from '../constants/constants'
import { EventCode } from '../constants/enums'
import SongModel from '../models/songModel'
import { Template } from '../templates/template'

class SongView {
  private songsListElement: HTMLElement
  private songEle: string
  private removeBtn: string
  private searchInput: HTMLInputElement

  constructor() {
    this.songsListElement = document.querySelector(
      '.songs__list'
    )! as HTMLElement
    this.songEle = '.song'
    this.removeBtn = '.song__remove'
    this.searchInput = document.querySelector(
      '#search-song-input'
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
      this.songsListElement.innerHTML += Template.song.getNoneSongTemplate()
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
      if (event.code !== EventCode.Tab) handleSearch()
    })
  }

  /**
   * add delegated event listener viewing song details
   * @param handleViewSongDetails controller handle function
   */
  addDelegateViewSongDetailListener = (
    handleViewSongDeta: (songid: string) => void
  ): void => {
    this.songsListElement.addEventListener('click', (event) => {
      event.preventDefault()

      const ele: HTMLElement | null = (event.target as HTMLElement).closest(
        this.songEle
      )
      if (ele) {
        handleViewSongDeta(ele.parentElement?.getAttribute('data-id')?.trim()!)
      }
    })
  }

  /**
   * add delegated event listener removing song
   * @param handleRemoveSong controller handle function
   */
  addDelegateRemoveSongListener = (
    handleRemoveSong: (songid: string) => void
  ): void => {
    this.songsListElement.addEventListener('click', (event) => {
      event.preventDefault()
      const removeEle: HTMLButtonElement | null = (
        event.target as HTMLElement
      ).closest(this.removeBtn)
      if (removeEle) {
        if (window.confirm(CONFIRM_MESSAGE.REMOVE_SONG)) {
          handleRemoveSong(removeEle.parentElement?.getAttribute('data-id')!)
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
