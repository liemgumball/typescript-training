import { GENRE_RULES, SONG_RULES } from '../constants/constants'
import { formatDateTime, formatName } from '../helpers/format'
import { getImgUrl, getVideoId } from '../helpers/songHelper'
import SongModel from '../models/songModel'

class SongTemplate {
  constructor() {}

  /**
   * get the template to render data row of song
   * @param {SongModel} song model instance of the song
   * @returns html template
   */
  getSongTemplate = (song: SongModel): string => `
    <li class="li li--song" data-id="${song.id}">
      <div class="song">
        <div class="song__data song__title text text-light">
          <img
          class="song__data__img"
            src="${getImgUrl(song.link)}"
            alt="title image"
          />
          <span> ${formatName(song.title, SONG_RULES.ITEM_MAX_LENGTH)} </span>
        </div>
        <div
          class="song__data song__artist text text-small text-light text-sub"
        >
          ${song.artist}  
        </div>
        <div
          class="song__data song__genre text text-small text-light text-sub"
        >
        ${formatName(song.genre?.name!, GENRE_RULES.ITEM_MAX_LENGTH)}
        </div>
        <div
          class="song__data song__date text text-small text-light text-sub"
        >
          ${formatDateTime(new Date(song.lastEdited))}
        </div>
      </div>
      <div class="song__remove">
        <button class="btn btn--icon fas fa-trash"></button>
      </div>
    </li>
  `

  /**
   * get song detail html template
   * @param {SongModel} song
   * @returns html template
   */
  getSongDetail = (song: SongModel): string => `
        <div class="img-container">
          <iframe width="425" height="240" loading="lazy"
            src="https://www.youtube.com/embed/${getVideoId(song.link)}?rel=0">
          </iframe>
        </div>
        <div class="song-detail">
          <p class="text">${song.title}</p>
          <p class="text text-light text-small text-sub">
            ${song.artist}
          </p>
          <p class="text text-light text-small text-sub">
            ${song.genre?.name}
          </p>
        </div>
        <div class="modal__footer">
          <button type="button" class="btn btn--primary btn--fixed-width"
            id="modal__dialog__edit-btn"
          >
            <p class="text text-small text-black">Edit song</p>
          </button>
        </div>
    `

  /**
   * get the html for no song found
   * @returns html template
   */
  getNoneSongTemplate = (): string => `
    <li class="li text text-sub text-small mt20"> No song found</li>
  `
}

export default SongTemplate
