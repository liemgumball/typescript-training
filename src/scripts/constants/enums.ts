export enum ApiMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

// used to detemine the which key typed on the keyboard
export enum EventCode {
  Enter = 'Enter',
  Esc = 'Escape',
  Tab = 'Tab',
}

export enum ModalType {
  SongDetail,
  AddSong,
  EditSong,
}

export enum MessageType {
  Failed = 0,
  Success = 1,
}

export enum ErrorCode {
  PROCESS_FAILED,
  WHITE_SPACE_INVALID,
  LINK_INVALID,
  REPEATED_ERROR,
}
