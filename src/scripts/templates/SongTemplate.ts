import { formatDateTime, getImgUrl, getVideoId } from '../helpers/util'
import SongModel, { ISong } from '../models/SongModel'

class SongTemplate {
    constructor() {}

    /**
     * template to render data row of song
     * @param {SongModel} song model instance of the song
     * @returns html string to render data row
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
                    <span> ${song.title} </span>
                </div>
                <div
                class="song__data song__artist text text-small text-light text-sub"
                >
                    ${song.artist}  
                </div>
                <div
                    class="song__data song__genre text text-small text-light text-sub"
                >
                    ${song.genre.name}
                </div>
                <div
                    class="song__data song__date text text-small text-light text-sub"
                >
                    ${formatDateTime(song.lastEdited)}
                </div>
            </div>
            <div class="song__remove">
                <button class="btn btn--icon fa fa-trash"></button>
            </div>
        </li>
    `

    /**
     * song detail template
     * @param {SongModel} song
     * @returns html template of songDetail
     */
    getSongDetail = (song: SongModel): string => `
        <div class="img-container">
            <iframe width="425" height="240" loading="lazy"
                src="https://www.youtube.com/embed/${getVideoId(
                    song.link,
                )}?rel=0">
            </iframe>
        </div>
        <div class="song-detail">
            <p class="text">${song.title}</p>
            <p class="text text-light text-small text-sub">
            ${song.artist}
            </p>
            <p class="text text-light text-small text-sub">
                ${song.genre.name}
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

    getNoneSongTemplate = (): string => `
        <li class="li text text-small"> No song found</li>
    `
}

export default SongTemplate
