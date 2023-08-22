import { ErrorCode } from './enums'

// used anywhere
export const COMMON = {
  EMPTY: '',
}
// used for validate
export const REGEX = {
  SONG_LINK_URLPATTERN: /^https:\/\/youtu.be\/[^ "]+$/,
}

// used to format on view
export const GENRE_RULES = {
  ITEM_MAX_LENGTH: 10,
}

// used to format on view
export const SONG_RULES = {
  ITEM_MAX_LENGTH: 30,
}

export const TEMPLATE = {
  SONG_IMG_URL_TEMPLATE: 'https://img.youtube.com/vi/videoId/0.jpg',
}

// title of modal
export const MODAL_TITLE = {
  ADD_SONG: 'Add new song',
  EDIT_SONG: 'Edit song',
}

// messages of snackbar
export const SNACKBAR_MESSAGE = {
  SAVE_SUCCESS: 'Save Success',
  SAVE_FAILURE: 'Save Failed',
  REMOVE_SUCCESS: 'Remove Success',
}

// message to confirm actions
export const CONFIRM_MESSAGE = {
  REMOVE_GENRE: 'Do you want to remove this genre including these songs?',
  REMOVE_SONG: 'Do you want to remove this song?',
}

// message of errors
export const ERROR_MESSAGES = {
  [ErrorCode.PROCESS_FAILED]: 'Something went wrong! Please try again',
  [ErrorCode.WHITE_SPACE_INVALID]: 'Cannot only whitespace!',
  [ErrorCode.LINK_INVALID]: 'Invalid link format!',
  [ErrorCode.REPEATED_ERROR]: 'Can not save this! Repeated name',
}

// resources of database
export const RESOURCE_NAME = {
  SONGS: '/songs',
  GENRES: '/genres',
  GENRE_RELATION: '?_expand=genre',
}
