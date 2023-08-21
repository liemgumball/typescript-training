import { ErrorCode } from './enums'

// used anywhere
export const COMMON = {
  EMPTY: '',
}
// used for validate song link
export const REGEX = {
  SONG_LINK_URLPATTERN: /^https:\/\/youtu.be\/[^ "]+$/,
}

export const GENRE_RULES = {
  ITEM_MAX_LENGTH: 10,
}

export const SONG_RULES = {
  ITEM_MAX_LENGTH: 30,
}

export const URL = {
  SONG_IMG_TEMPLATE: 'https://img.youtube.com/vi/videoId/0.jpg',
}

export const MODAL_TITLE = {
  ADD_SONG: 'Add new song',
  EDIT_SONG: 'Edit song',
}

export const SNACKBAR_MESSAGE = {
  SAVE_SUCCESS: 'Save Success',
  SAVE_FAILURE: 'Save Failed',
  REMOVE_SUCCESS: 'Remove Success',
}

export const CONFIRM_MESSAGE = {
  REMOVE_GENRE: 'Do you want to remove this genre including these songs?',
  REMOVE_SONG: 'Do you want to remove this song?',
}

export const ERROR_MESSAGES = {
  [ErrorCode.PROCESS_FAILED]: 'Something went wrong! Please try again',
  [ErrorCode.WHITE_SPACE_INVALID]: 'Cannot only whitespace!',
  [ErrorCode.LINK_INVALID]: 'Invalid link format!',
  [ErrorCode.REPEATED_ERROR]: 'Can not save this! Repeated name',
}
