// method of api request
export enum ApiMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

// detemine the which key typed on the keyboard
export enum EventCode {
  Enter = 'Enter',
  Esc = 'Escape',
  Tab = 'Tab',
}

// type of modal to render
export enum ModalType {
  SongDetail,
  AddSong,
  EditSong,
}

// type of message of snackbar
export enum MessageType {
  Failed = 0,
  Success = 1,
}

// to define the error
export enum ErrorCode {
  PROCESS_FAILED,
  WHITE_SPACE_INVALID,
  LINK_INVALID,
  REPEATED_ERROR,
}
