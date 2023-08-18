export enum apiMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

export enum inValidGenreFields {
    Empty,
    Repeated,
}

// used to detemine the which key typed on the keyboard
export enum EVENT_CODE {
    ENTER = 'Enter',
    ESC = 'Escape',
    TAB = 'Tab',
}

// used to define type of the modal to render
export enum MODAL_TYPE {
    SONG_DETAIL = 'Song detail',
    ADD_SONG = 'Add new song',
    EDIT_SONG = 'Edit song',
}

export enum MESSAGE_TYPE {
    Failed = 0,
    Success = 1,
}
