// used anywhere
export const COMMON = {
    EMPTY: '',
}

export const URL = {
    SONG_IMG_TEMPLATE: 'https://img.youtube.com/vi/videoId/0.jpg',
}

// used to informate the user
export const MESSAGE = {
    //snackbar message
    SAVE_SUCCESS: 'Save Success',
    SAVE_FAILURE: 'Save Failed',
    REMOVE_SUCCESS: 'Remove Success',

    //confirm remove song
    REMOVE_SONG: 'Do you want to remove this song?',

    //confirm remove genre includes its songs
    REMOVE_GENRE: 'Do you want to remove this genre including these songs?',

    //input validation
    WHITE_SPACE_INVALID: 'Cannot only whitespace!',
    LINK_INVALID: 'Invalid link format!',

    //use for try catch problems
    PROCESS_FAILED: 'Something went wrong! Please try again',
    REMOVE_GENRE_CONFIRM:
        'Do you want to remove this genre including these songs?',
    REPEATED_GENRE_ERROR: 'Can not save this genre! Repeated genre name',
}

// used for validate song link
export const REGEX = {
    SONG_LINK_URLPATTERN: /^https:\/\/youtu.be\/[^ "]+$/,
}

export const GENRE_RULES = {
    GENRE_ITEM_MAX_LENGTH: 10,
}

export const SONG_RULES = {
    SONG_ITEM_MAX_LENGTH: 30,
}
