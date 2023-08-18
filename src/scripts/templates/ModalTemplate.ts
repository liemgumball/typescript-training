import { COMMON } from '../constants/constants'

class ModalTemplate {
    constructor() {}

    /**
     * add song form template
     * @param {String} title of the Input form
     * @param {Object} data for the input value
     * @returns html template of add song form element
     */
    getSongInputForm = (title: string, data?: any): string => `
        <div class="modal__header">
            <p class="text text-bold text-big">${title}</p>
        </div>
        <div class="modal__body">
            <input
                class="input input--text"
                type="text"
                name="Title"
                id="song__title"
                placeholder="Song title"
                required
                value="${data.title || COMMON.EMPTY}"
            />
            <select
                class="input input--select"
                name="Genre"
                id="song__genre"
                title="Genre"
                value="${data.genreId || COMMON.EMPTY}"
            >
            </select>
            <input
                class="input input--text"
                type="text"
                name="Artist"
                id="song__artist"
                placeholder="Artist"
                required
                value="${data.artist || COMMON.EMPTY}"
            />
            <input
                class="input input--text"
                type="text"
                name="Link"
                id="song__link"
                placeholder="https://youtu.be/videoID"
                required
                value="${data.link || COMMON.EMPTY}"
            />
        </div>
        <div class="modal__footer">
            <button type="submit" class="ipnut btn btn--primary btn--fixed-width">
                Submit
            </button>
            <button
                type="button"
                class="ipnut btn btn--fixed-width" 
                id="modal__dialog__cancel-btn"
            >
                Cancel
            </button>
        </div>
    `
}

export default ModalTemplate
