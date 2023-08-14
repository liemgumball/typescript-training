export enum apiMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export const COMMON = {
    EMPTY: '',
}

export const URL = {
    SONG_IMG: 'https://img.youtube.com/vi/videoId/0.jpg',
}

export const MESSAGE = {
    PROCESS_FAILED: 'Something went wrong! Please try again',
    REMOVE_GENRE_CONFIRM:
        'Do you want to remove this genre including these songs?',

    //if the genre name is invalid,
    EDIT_GENRE_ERROR: 'Can not save this genre!',

    //confirm remove song
    REMOVE_SONG: 'Do you want to remove this song?',

    //confirm remove genre includes its songs
    REMOVE_GENRE: 'Do you want to remove this genre including these songs?',

    //input validation
    WHITE_SPACE_INVALID: 'Cannot only whitespace!',
    LINK_INVALID: 'Invalid link format!',

    //use for try catch problems
    GENERAL_ERROR: 'The process got failed',
    MISSING_ID: "Error: Couldn't find song by ID: ",
}

export const EVENT_CODE = {
    ENTER: 'Enter',
    ESC: 'Escape',
    TAB: 'Tab',
}

export const MODAL_TYPE = {
    SONG_DETAIL: 'Song detail',
    ADD_SONG: 'Add new song',
    EDIT_SONG: 'Edit song',
}

export const REGEX = {
    SONG_LINK_URLPATTERN: /^https:\/\/youtu.be\/[^ "]+$/,
}
