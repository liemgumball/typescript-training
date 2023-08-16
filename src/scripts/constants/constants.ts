export enum apiMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

// used anywhere
export const COMMON = {
    EMPTY: '',
}

export const URL = {
    SONG_IMG_TEMPLATE: 'https://img.youtube.com/vi/videoId/0.jpg',
}

// used to informate the user
export const MESSAGE = {
    PROCESS_FAILED: 'Something went wrong! Please try again',
    REMOVE_GENRE_CONFIRM:
        'Do you want to remove this genre including these songs?',

    //if the genre name is invalid,
    REPEATED_GENRE_ERROR: 'Can not save this genre! Repeated genre name',

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

// used to detemine the which key typed on the keyboard
export enum EVENT_CODE {
    ENTER = 'Enter',
    ESC = 'Escape',
    TAB = 'Tab',
}

// used to define type of the modal to render
export const MODAL_TYPE = {
    SONG_DETAIL: 'Song detail',
    ADD_SONG: 'Add new song',
    EDIT_SONG: 'Edit song',
}

// used for validate song link
export const REGEX = {
    SONG_LINK_URLPATTERN: /^https:\/\/youtu.be\/[^ "]+$/,
}

export enum inValidGenreFields {
    EMPTY,
    REPEATED,
    ADD,
    EDIT,
}
